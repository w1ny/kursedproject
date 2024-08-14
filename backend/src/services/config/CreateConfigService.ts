import { CreateConfigRepository } from "../../repositories/config/CreateConfigRepository";
import { ConfigInterface } from "../../model/config/Config";

export class CreateConfigService {
	async execute({ key, value }: Omit<ConfigInterface, "id">) {
		const createConfigRepository = new CreateConfigRepository();

		try {
			const account = createConfigRepository.query({ key, value });
			return account;
		} catch (err: any) {}
	}
}
