import { Request, Response } from "express";
import Web3 from "web3";
import { CreateAppUserService } from "../../services/appUser/CreateAppUserService";
import { ReadAppUserService } from "../../services/appUser/ReadAppUserService";
import { CreateWalletService } from "../../services/wallet/CreateWalletService";

export class CreateAppUserController {
	private createAppUserService: CreateAppUserService;
	private createWalletService: CreateWalletService;
	private readAppUserService: ReadAppUserService;

	constructor() {
		this.createAppUserService = new CreateAppUserService();
		this.createWalletService = new CreateWalletService();
		this.readAppUserService = new ReadAppUserService();
	}

	handle = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { address, network, balance, networkType, clientVersion, signature, message } = req.body.walletData;

			// Verificar se os campos obrigatórios foram enviados
			if (!address || !network || !signature || !message) {
				return res.status(400).json({ error: "Address, network, message, and signature are required." });
			}

			// Validar assinatura
			const web3 = new Web3();
			const recoveredAddress = web3.eth.accounts.recover(message, signature);

			if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
				return res.status(401).json({ error: "Invalid signature. Access denied." });
			}

			// Verificar se o usuário já está registrado
			const userRegister = await this.readAppUserService.getByWalletAddress(address);

			if (userRegister) {				
				return res.status(201).json(userRegister);
			}

			// Criar a wallet
			const wallet = await this.createWalletService.execute({
				address,
				network,
				balance: balance || 0,
				networkType: networkType || "testnet",
				clientVersion: clientVersion || null,
			});

			// Criar o AppUser
			const appUser = await this.createAppUserService.execute({
				username: address,
				walletId: wallet.id,
			});

			return res.status(201).json(appUser);
		} catch (err: any) {
			console.error("Error in CreateAppUserController:", err.message);
			return res.status(500).json({ error: err.message });
		}
	};
}
