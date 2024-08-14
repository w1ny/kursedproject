import { CreateAccountTable } from "./account/CreateAccountTable";
import { CreateConfigTable } from "./config/CreateConfigTable";
import { CreateAccountConfirmationTableRepository } from "./accountConfirmation/CreateAccountConfirmationTable";

export const initializeDatabase = async () => {
	const createAccountTable = new CreateAccountTable();
	const createConfigTable = new CreateConfigTable();
	const createAccountConfirmationTable = new CreateAccountConfirmationTableRepository();

	await createAccountTable.query();
	await createConfigTable.query();
	await createAccountConfirmationTable.query();
};
