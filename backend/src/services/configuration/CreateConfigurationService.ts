import { CreateConfigurationRepository } from "../../repositories/configuration/CreateConfigurationRepository";

export interface Configuration {
	key: string;
	value: string;
}

export class CreateConfigurationService {
	private createConfigurationService: CreateConfigurationRepository;

	constructor() {
		this.createConfigurationService = new CreateConfigurationRepository();
	}

	async execute({ key, value }: Configuration): Promise<Configuration | null> {
		try {
			const config = await this.createConfigurationService.upsertConfig(key, value);
			return config;
		} catch (err: any) {
			console.error(`Error creating/updating configuration for key: ${key}`, err);
			throw new Error("Error processing configuration.");
		}
	}
}
