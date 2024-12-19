import { DeleteAppUserValidateRepository } from "../../repositories/appUserValidate/DeleteAppUserValidateRepository";
import { ReadConfigurationService } from "../configuration/ReadConfigurationService";

export class DeleteAppUserValidateService {
	private deleteAppUserValidateRepository: DeleteAppUserValidateRepository;
	private readConfigurationService: ReadConfigurationService;
  
	constructor() {
	  this.readConfigurationService = new ReadConfigurationService();
	  this.deleteAppUserValidateRepository = new DeleteAppUserValidateRepository();
	}
  
	async execute(id: string) {
	  try {
		const account = await this.deleteAppUserValidateRepository.deleteById(id);
		return account;
	  } catch (err: any) {
		console.error("Error deleting account confirmation:", err);
		throw err;
	  }
	}
  
	async deleteExpired() {
	  try {
		const expiryDays = await this.readConfigurationService.getValidationExpiryDays();
		const deleteExpiredTokens = await this.deleteAppUserValidateRepository.deleteExpiredTokens(
		  String(expiryDays)
		);
		return deleteExpiredTokens;
	  } catch (err: any) {
		console.error("Error deleting expired account confirmations:", err);
		throw err;
	  }
	}
  }
  
