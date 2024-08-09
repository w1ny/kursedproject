import { query } from "../../db/dbConfig";
import { UserConfirmationInterface } from "../../model/userConfirmation/UserConfirmation";
import { v4 as uuidv4 } from "uuid";

export class CreateUserConfirmationRepository {
	async query({ username, email, token }: UserConfirmationInterface) {
		const confirmationQueryText = `
      INSERT INTO user_confirmation (id, user_id, username, email, confirmation_token, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING user_id;
    `;
		const userId = uuidv4();
		const confirmationId = uuidv4();
		try {
			const confirmation = await query(confirmationQueryText, [confirmationId, userId, username, email, token]);
			return confirmation.rows[0];
		} catch (err) {
			console.error("Error creating user confirmation:", err);
			throw err;
		}
	}
}
