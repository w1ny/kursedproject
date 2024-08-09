import { RetrieveConfigRepository } from "../../repositories/config/RetrieveConfigRepository";

export class RetrieveConfigService {
	async execute(key: string) {
		const retrieveConfigRepository = new RetrieveConfigRepository();

		try {
			const user = retrieveConfigRepository.query(key);
			return user;
		} catch (err: any) {}
	}
}
