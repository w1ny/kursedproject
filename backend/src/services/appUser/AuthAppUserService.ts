import { ReadAppUserRepository } from "../../repositories/appUser/ReadAppUserRepository";
import { compare } from "bcryptjs";

interface AuthRequest {
  login: string;
  password: string;
}

export class AuthAppUserService {
  private readAppUserRepository = new ReadAppUserRepository();

  async execute({ login, password }: AuthRequest) {
    try {
      const user = await this.readAppUserRepository.getByLoginInfo(login);
      if (!user || !user.password) {
        throw new Error("User/password incorrect.");
      }

      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("User/password incorrect.");
      }

      const result = {
        ok: true,
        id: user.id,
        username: user.username,
        email: user.email,
      };

      return result;
    } catch (err: any) {
      console.error("Authentication error:", err.message);
      throw new Error("Authentication failed. Please check your credentials.");
    }
  }
}
