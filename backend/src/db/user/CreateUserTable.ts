import { query } from "../dbConfig";

export class CreateUserTable {
	async query() {
		const queryText = `
      CREATE TABLE IF NOT EXISTS user (
        id UUID PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        walletAddress VARCHAR(255) UNIQUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
		try {
			await query(queryText);
			console.log("Users table created successfully");
		} catch (err) {
			console.error("Error creating users table:", err);
		}
	}
}
