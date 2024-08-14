import { RetrieveConfigRepository } from "../../repositories/config/RetrieveConfigRepository";

export class RetrieveConfigService {
	async execute(key: string) {
		const retrieveConfigRepository = new RetrieveConfigRepository();

		try {
			const account = retrieveConfigRepository.query(key);
			return account;
		} catch (err: any) {}
	}
}
