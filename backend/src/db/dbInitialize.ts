import { CreateUserTable } from "./user/CreateUserTable";
import { CreateConfigTable } from "./config/CreateConfigTable";
import { CreateUserConfirmationTableRepository } from "./userConfirmation/CreateUserConfirmationTable";

export const initializeDatabase = async () => {
	const createUserTable = new CreateUserTable();
	const createConfigTable = new CreateConfigTable();
	const createUserConfirmationTable = new CreateUserConfirmationTableRepository();

	await createUserTable.query();
	await createConfigTable.query();
	await createUserConfirmationTable.query();
};
