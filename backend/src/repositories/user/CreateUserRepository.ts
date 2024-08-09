import { query } from "../../db/dbConfig";
import { UserInterface } from "../../model/user/User";

export class CreateUserRepository {
  async query({ id, username, email, walletAddress }: UserInterface) {
    const queryText = `
      INSERT INTO user (id, username, email, walletAddress, createdAt)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *;
    `;
    try {
      const res = await query(queryText, [id, username, email, walletAddress]);
      return res.rows[0];
    } catch (err) {
      console.error("Error creating user:", err);
      throw err;
    }
  }
}