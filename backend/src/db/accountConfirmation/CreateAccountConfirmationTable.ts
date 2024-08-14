import { query } from "../dbConfig";

export class CreateAccountConfirmationTableRepository {
	async query() {
		const queryText = `
      CREATE TABLE IF NOT EXISTS accountConfirmation (
        id UUID PRIMARY KEY,
        username VARCHAR(20) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        confirmationToken VARCHAR(255) UNIQUE NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
		try {
			await query(queryText);
			console.log("(accountConfirmation) table created successfully");
		} catch (err) {
			console.error("Error creating (accountConfirmation) table:", err);
		}
	}
}
