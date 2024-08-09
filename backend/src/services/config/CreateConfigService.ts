import { CreateConfigRepository } from "../../repositories/config/CreateConfigRepository";
import { ConfigInterface } from "../../model/config/Config";

export class CreateConfigService {
	async execute({ key, value }: Omit<ConfigInterface, "id">) {
		const createConfigRepository = new CreateConfigRepository();

		try {
			const user = createConfigRepository.query({ key, value });
			return user;
		} catch (err: any) {}
	}
}
