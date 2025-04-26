const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./agrisolver.db", (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
        db.run(
            `CREATE TABLE IF NOT EXISTS instructions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plant_name TEXT NOT NULL,
      country TEXT NOT NULL,
      instructions_text TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(plant_name, country)
    )`,
            (err) => {
                if (err) {
                    console.error("Error creating table:", err.message);
                } else {
                    console.log("Table 'instructions' is ready.");
                }
            }
        );
    }
});

module.exports = db;
