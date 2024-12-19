export interface AppUserInterface {
	id: string;
	username: string;
	email: string;
	password: string;
	nickname: string;
	walletId?: string | null;
}
