import { query } from "../dbConfig";

export class CreateConfigTable {
	async query() {
		const queryText = `
      CREATE TABLE IF NOT EXISTS configuration (
        id UUID PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        value TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
		try {
			await query(queryText);
			console.log("(configuration) table created successfully");
		} catch (err) {
			console.error("Error creating (configuration) table:", err);
		}
	}
}
