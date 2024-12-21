"use client"
import Web3, { net } from "web3";
import { checkAndAddAmoyNetwork } from "./networks";
import { showMessage } from "./showMessage";
import { verifyMetamask } from "./verifyMetamask";

export const connectWalletToAmoy = async (): Promise<any> => {
	try {
		if (await verifyMetamask()) {
			showMessage("MetaMask not detected! Please install it.", "error");
			return null;
		}

		const networkAdded = await checkAndAddAmoyNetwork();
		if (!networkAdded) {
			showMessage("Failed to connect to the Amoy Testnet. Please try again.", "error");
			return null;
		}

		const web3 = new Web3(window.ethereum);
		await window.ethereum.request({ method: "eth_requestAccounts" });
		const accounts = await web3.eth.getAccounts();

		if (accounts.length > 0) {
			const address = accounts[0];
			const balance = await web3.eth.getBalance(address);
			const clientVersion = await web3.eth.getNodeInfo();
			const network = await web3.eth.net.getId();

			console.log(`Wallet connected: ${accounts[0]}`, "success");
			return {
				address,
				balance: web3.utils.fromWei(balance, "ether").toString(), 
				network: network.toString(),
				clientVersion,
				networkType: Number(network) == 137 ? "mainnet" : "testnet", 
			};
		} else {
			showMessage("No accounts found in MetaMask.", "warning");
			return null;
		}
	} catch (error: any) {
		console.error("Error connecting to Amoy:", error);
		showMessage("An error occurred while connecting to Amoy. Check the console for details.", "error");
		return null;
	}
};
