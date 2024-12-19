import { DeleteAppUserValidateRepository } from "../../repositories/appUserValidate/DeleteAppUserValidateRepository";
import { ReadAppUserValidateRepository } from "../../repositories/appUserValidate/ReadAppUserValidateRepository";
import { CreateAppUserRepository } from "../../repositories/appUser/CreateAppUserRepository";

export class UpdateAppUserValidateService {
	private deleteAppUserValidateRepository: DeleteAppUserValidateRepository;
	private readAppUserValidateRepository: ReadAppUserValidateRepository;
	private createAppUserRepository: CreateAppUserRepository;

	constructor() {
		this.deleteAppUserValidateRepository = new DeleteAppUserValidateRepository();
		this.readAppUserValidateRepository = new ReadAppUserValidateRepository();
		this.createAppUserRepository = new CreateAppUserRepository();
	}

	async execute(token: string, nickname: string, walletId: string | null) {
		try {
			const appUserValidation = await this.readAppUserValidateRepository.getByToken(token);

			if (!appUserValidation) {
				throw new Error("Invalid or expired token.");
			}
			
			const appUser = await this.createAppUserRepository.create({
				username: appUserValidation.username,
				email: appUserValidation.email,
				password: appUserValidation.password,
				nickname: nickname, 
				walletId: walletId, 
			});

			await this.deleteAppUserValidateRepository.deleteById(appUserValidation.id);

			return appUser;
		} catch (err) {
			console.error("Error confirming app user:", err);
			throw err;
		}
	}
}
