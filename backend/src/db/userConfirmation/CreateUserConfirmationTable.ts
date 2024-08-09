import { query } from "../dbConfig";

export class CreateUserConfirmationTableRepository {
	async query() {
		const queryText = `
      CREATE TABLE IF NOT EXISTS user_confirmation (
        id UUID PRIMARY KEY,
        user_id UUID NOT NULL,
        username VARCHAR(20) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        confirmation_token VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES user(id)
      );
    `;
		try {
			await query(queryText);
			console.log("User confirmation table created successfully");
		} catch (err) {
			console.error("Error creating user confirmation table:", err);
		}
	}
}
