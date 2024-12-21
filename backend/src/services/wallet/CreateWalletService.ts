import { CreateWalletRepository } from "../../repositories/wallet/CreateWalletRepository";
import { ReadWalletRepository } from "../../repositories/wallet/ReadWalletRepository";

export interface Wallet {
	address: string;
	network: string;
	balance?: number;
	isVerified?: boolean;
	networkType?: "mainnet" | "testnet";
	clientVersion?: string | null;
}

export class CreateWalletService {
	private createWalletRepository: CreateWalletRepository;
	private readWalletRepository: ReadWalletRepository;

	constructor() {
		this.createWalletRepository = new CreateWalletRepository();
		this.readWalletRepository = new ReadWalletRepository();
	}

	async execute({ address, network, balance = 0.0, networkType = "testnet", clientVersion = null }: Wallet) {
		try {
			if (!address || !network) {
				throw new Error("Address and network are required.");
			}

			const existingWallet = await this.readWalletRepository.findByAddress(address);
			if (existingWallet) {
				throw new Error("A wallet with this address already exists.");
			}

			const wallet = await this.createWalletRepository.create({
				address,
				network,
				balance,
				networkType,
				clientVersion,
			});

			return wallet;
		} catch (err: any) {
			console.error("Error creating wallet:", err.message);
			throw new Error("Failed to create wallet. Please try again later.");
		}
	}
}
