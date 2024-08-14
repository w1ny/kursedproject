import { query } from "../../db/dbConfig";
import { AccountConfirmationInterface } from "../../model/accountConfirmation/AccountConfirmation";
import { v4 as uuidv4 } from "uuid";

export class CreateAccountConfirmationRepository {
	async query({ username, email, token }: AccountConfirmationInterface) {
		const confirmationQueryText = `
      INSERT INTO accountConfirmation (id, username, email, confirmationToken, createdAt)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING id, username, email, confirmationToken, createdAt;
    `;
		
		const confirmationId = uuidv4();
		try {
			const confirmation = await query(confirmationQueryText, [confirmationId, username, email, token]);
			return confirmation.rows[0];
		} catch (err) {
			console.error("Error creating account confirmation:", err);
			throw err;
		}
	}
}
