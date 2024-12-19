import { ReadAppUserRepository } from "../../repositories/appUser/ReadAppUserRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
	login: string;
	password: string;
}

export class AuthAppUserService {
	private readAppUserRepository: ReadAppUserRepository;

	constructor(){
		this.readAppUserRepository = new ReadAppUserRepository();
	}

	execute = async({ login, password }: AuthRequest) => {
		try {
			const user = await this.readAppUserRepository.getByLoginInfo(login);
			if (!user || !user.password) {
				throw new Error("User/password incorrect.");
			}

			const passwordMatch = await compare(password, user.password);
			if (!passwordMatch) {
				throw new Error("User/password incorrect.");
			}

			const token = sign(
				{
					name: user.username,
					email: user.email,
				},
				process.env.JWT_SECRET!,
				{
					subject: user.id,
					expiresIn: "30d",
				}
			);

			const result = {
				ok: true,
				id: user.id,
				username: user.username,
				email: user.email,
				token: token,
			};

			return result;
		} catch (err: any) {
			console.error("Authentication error:", err.message);
			throw new Error("Authentication failed. Please check your credentials.");
		}
	}
}
