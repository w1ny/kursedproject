import { DeleteUserConfirmationRepository } from "../../repositories/userConfirmation/DeleteUserConfirmationRepository";
import { RetrieveUserConfirmationRepository } from "../../repositories/userConfirmation/RetrieveUserConfirmationRepository";
import { CreateUserRepository } from "../../repositories/user/CreateUserRepository";

export class UpdateUserConfirmationService {
	async execute(token: string) {
		const deleteUserConfirmationRepository = new DeleteUserConfirmationRepository();
		const retrieveUserConfirmationRepository = new RetrieveUserConfirmationRepository();
		const createUserRepository = new CreateUserRepository();

		try {
			const userConfirmation = await retrieveUserConfirmationRepository.getUserConfirmationByToken(token);

			if (!userConfirmation) {
				throw new Error("Invalid or expired token");
			}

			const user = await createUserRepository.query({
				id: userConfirmation.user_id,
				username: userConfirmation.username,
				email: userConfirmation.email,
				walletAddress: "",
			});

			await deleteUserConfirmationRepository.query(userConfirmation.id);

			return user;
		} catch (err: any) {
			console.error("Error confirming user:", err);
			throw err;
		}
	}
}
