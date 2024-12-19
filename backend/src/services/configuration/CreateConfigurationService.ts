import { CreateConfigurationRepository } from "../../repositories/configuration/CreateConfigurationRepository";
import { ConfigurationInterface } from "../../model/configuration/Configuration";

export class CreateConfigurationService {
	private createConfigurationService: CreateConfigurationRepository;

	constructor() {
		this.createConfigurationService = new CreateConfigurationRepository();
	}

	async execute({ key, value }: Omit<ConfigurationInterface, "id">): Promise<ConfigurationInterface | null> {
		try {
			const config = await this.createConfigurationService.upsertConfig(key, value);
			return config;
		} catch (err: any) {
			console.error(`Error creating/updating configuration for key: ${key}`, err);
			throw new Error("Error processing configuration.");
		}
	}
}
