import { query } from "../../db/dbConfig";
import { ConfigInterface } from "../../model/config/Config";
import { v4 as uuidv4 } from "uuid";

export class CreateConfigRepository {
	async query({ key, value }: Omit<ConfigInterface, "id">) {
		const id = uuidv4();
		const queryText = `
      INSERT INTO configuration (id, key, value)
      VALUES ($1, $2, $3)
      ON CONFLICT (key)
      DO UPDATE SET value = EXCLUDED.value
    `;
		try {
			await query(queryText, [id, key, value]);
		} catch (err) {
			console.error("Error inserting/updating config:", err);
			throw err;
		}
	}
}
