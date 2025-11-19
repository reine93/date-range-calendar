const fs = require("fs");
const path = require("path");

const rawPath = path.join(process.cwd(), "mock-api", "calendar-raw.json");
const outputPath = path.join(process.cwd(), "mock-api", "db.json");

const rawData = JSON.parse(fs.readFileSync(rawPath, "utf8"));

const db = {
  rawcalendar: rawData
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

fs.writeFileSync(outputPath, JSON.stringify(db, null, 2));

console.log("✅ mock-api/db.json has been generated from calendar-raw.json");
