const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "agrisolver.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
        createInstructionsTable();
    }
});

const createInstructionsTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS instructions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plant_name TEXT NOT NULL UNIQUE,
      instructions_text TEXT NOT NULL,
      fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
    db.run(sql, (err) => {
        if (err) {
            console.error("Error creating instructions table:", err.message);
        } else {
            console.log("Instructions table checked/created successfully.");
        }
    });
};

module.exports = db;
