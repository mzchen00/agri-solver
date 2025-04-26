require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./database");
const axios = require("axios");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/instructions/:plantName", async (req, res) => {
    const { plantName } = req.params;
    const { country } = req.query;

    // if (!country) {
    //     return res
    //         .status(400)
    //         .json({ error: "Country parameter is required." });
    // }

    const lowerCasePlantName = plantName.toLowerCase();
    const lowerCaseCountry = country.toLowerCase();

    console.log(
        `Received request for instructions for: ${plantName} in ${country}`
    );

    const sqlSelect = `SELECT instructions_text FROM instructions WHERE plant_name = ? AND country = ?`;

    db.get(
        sqlSelect,
        [lowerCasePlantName, lowerCaseCountry],
        async (err, row) => {
            if (err) {
                console.error("Database select error:", err.message);
                return res
                    .status(500)
                    .json({ error: "Database error occurred." });
            }

            if (row) {
                console.log(
                    `Found cached instructions for ${plantName} in ${country}`
                );
                res.json({
                    plantName: plantName,
                    country: country,
                    instructions: row.instructions_text,
                    source: "cache",
                });
            } else {
                console.log(
                    `No cached instructions for ${plantName} in ${country}. Calling Perplexity API...`
                );
                const apiKey = process.env.PERPLEXITY_API_KEY;
                if (!apiKey) {
                    console.error("Perplexity API key is missing.");
                    return res.status(500).json({
                        error: "Server configuration error: Missing API key.",
                    });
                }
                try {
                    const perplexityUrl =
                        "https://api.perplexity.ai/chat/completions";

                    const prompt = `Use ${country}'s language in response. Provide concise step-by-step growing and planting instructions for ${plantName}${country}. Focus on key actions like soil preparation, planting depth, spacing, watering, sunlight needs, and basic fertilization suitable for that region if specified.`;
                    const systemPrompt = `You are an AI assistant,reply in the ${country}'s language`;

                    console.log("Using prompt:", prompt);
                    console.log("Using System prompt:", systemPrompt);
                    const response = await axios.post(
                        perplexityUrl,
                        {
                            temperature: 0.2,
                            top_p: 0.9,
                            return_images: false,
                            return_related_questions: false,
                            top_k: 0,
                            stream: false,
                            presence_penalty: 0,
                            frequency_penalty: 1,
                            web_search_options: { search_context_size: "low" },
                            model: "sonar",
                            messages: [
                                {
                                    content: systemPrompt,
                                    role: "system",
                                },
                                { content: prompt, role: "user" },
                            ],
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${apiKey}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    const fetchedInstructions =
                        response.data?.choices?.[0]?.message?.content?.trim();
                    const fetchedCitations = response.data?.citations || []; // Assuming citations are handled as before

                    if (!fetchedInstructions) {
                        console.error(
                            "Could not extract instructions from Perplexity response:",
                            response.data
                        );
                        return res.status(500).json({
                            error: "Failed to get valid instructions from AI service.",
                        });
                    }

                    let citationsText = "";
                    if (fetchedCitations.length > 0) {
                        citationsText = "\n\nSources:\n";
                        fetchedCitations.forEach((url) => {
                            citationsText += `${url}\n`;
                        });
                    }

                    // Combine instructions and citations
                    const combinedText = fetchedInstructions + citationsText;

                    console.log(
                        `Successfully fetched instructions and citations for ${plantName} in ${country} from API.`
                    );

                    const sqlInsert = `INSERT INTO instructions (plant_name, country, instructions_text) VALUES (?, ?, ?)`;
                    db.run(
                        sqlInsert,

                        [lowerCasePlantName, lowerCaseCountry, combinedText],
                        (insertErr) => {
                            if (insertErr) {
                                console.error(
                                    "Database insert error:",
                                    insertErr.message
                                );
                                res.json({
                                    plantName: plantName,
                                    country: country,
                                    instructions: combinedText,
                                    source: "api",
                                    cacheError: true,
                                });
                            } else {
                                console.log(
                                    `Successfully cached combined text for ${plantName} in ${country}.`
                                );
                                // Send combined text
                                res.json({
                                    plantName: plantName,
                                    country: country, // Optionally return country
                                    instructions: combinedText,
                                    source: "api",
                                });
                            }
                        }
                    );
                } catch (apiError) {
                    console.error(
                        "Perplexity API call error:",
                        apiError.response?.data || apiError.message
                    );
                    if (apiError.response?.status === 401) {
                        return res.status(401).json({
                            error: "API Authentication failed. Check API Key.",
                        });
                    }
                    res.status(500).json({
                        error: "Failed to fetch instructions from AI service.",
                        details: apiError.message,
                    });
                }
            }
        }
    );
});

app.get("/", (req, res) => {
    res.send("AgriSolver Backend is running!");
});

app.listen(port, () => {
    console.log(`Backend server listening on http://localhost:${port}`);
});
