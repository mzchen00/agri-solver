require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./database");
const axios = require("axios"); // Import axios

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---

// Updated endpoint for getting plant instructions
app.get("/api/instructions/:plantName", async (req, res) => {
    // Make the handler async
    const { plantName } = req.params;
    const lowerCasePlantName = plantName.toLowerCase();
    console.log(`Received request for instructions for: ${plantName}`);

    const sqlSelect = `SELECT instructions_text FROM instructions WHERE plant_name = ?`;

    db.get(sqlSelect, [lowerCasePlantName], async (err, row) => {
        if (err) {
            console.error("Database select error:", err.message);
            return res.status(500).json({ error: "Database error occurred." });
        }

        if (row) {
            console.log(`Found cached instructions for ${plantName}`);
            res.json({
                plantName: plantName,
                instructions: row.instructions_text,
                source: "cache",
            });
        } else {
            console.log(
                `No cached instructions for ${plantName}. Calling Perplexity API...`
            );
            const apiKey = process.env.PERPLEXITY_API_KEY;
            try {
                const perplexityUrl =
                    "https://api.perplexity.ai/chat/completions";
                // Use the plantName from the request in the prompt
                const prompt = `Provide concise step-by-step growing and planting instructions for ${plantName}. Focus on key actions like soil preparation, planting depth, spacing, watering, sunlight needs, and basic fertilization. Keep it practical and easy to follow for a beginner.`;

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
                        model: "sonar", // Or your preferred model
                        messages: [
                            {
                                content:
                                    "You are an AI assistant providing concise, practical farming advice for beginners.", // Adjusted system prompt slightly
                                role: "system",
                            },
                            { content: prompt, role: "user" }, // Use the generated prompt here
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

                if (!fetchedInstructions) {
                    console.error(
                        "Could not extract instructions from Perplexity response:",
                        response.data
                    );
                    return res.status(500).json({
                        error: "Failed to get valid instructions from AI service.",
                    });
                }

                console.log(
                    `Successfully fetched instructions for ${plantName} from API.`
                );

                // 4. Store fetched instructions in the database
                const sqlInsert = `INSERT INTO instructions (plant_name, instructions_text) VALUES (?, ?)`;
                db.run(
                    sqlInsert,
                    [lowerCasePlantName, fetchedInstructions],
                    (insertErr) => {
                        if (insertErr) {
                            console.error(
                                "Database insert error:",
                                insertErr.message
                            );
                            // Still return the fetched data to the user even if caching fails
                            res.json({
                                plantName: plantName,
                                instructions: fetchedInstructions,
                                source: "api",
                                cacheError: true,
                            });
                        } else {
                            console.log(
                                `Successfully cached instructions for ${plantName}.`
                            );
                            // 5. Send fetched instructions back to the frontend
                            res.json({
                                plantName: plantName,
                                instructions: fetchedInstructions,
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
                res.status(500).json({
                    error: "Failed to fetch instructions from AI service.",
                    details: apiError.message,
                });
            }
        }
    });
});

// Basic root route
app.get("/", (req, res) => {
    res.send("AgriSolver Backend is running!");
});

// Start the server
app.listen(port, () => {
    console.log(`Backend server listening on http://localhost:${port}`);
});
