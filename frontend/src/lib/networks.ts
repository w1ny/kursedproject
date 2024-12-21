"use client"
import Web3 from "web3";
import { verifyMetamask } from "./verifyMetamask";
import { showMessage } from "./showMessage";

//AMOY TESTNET
export const AMOY_NETWORK = {
	chainId: "0x13882",
	chainName: "AMOY",
	nativeCurrency: {
		name: "POL",
		symbol: "POL",
		decimals: 18,
	},
	rpcUrls: ["https://rpc-amoy.polygon.technology/"],
	blockExplorerUrls: ["https://amoy.polygonscan.com/"],
};

export const addAmoyNetwork = async (): Promise<boolean> => {
	try {
		await window.ethereum.request({
			method: "wallet_addEthereumChain",
			params: [AMOY_NETWORK],
		});
		showMessage("Amoy Testnet added successfully!", "success");
		return true;
	} catch (error: any) {
		if (error.code === 4001) {
			showMessage("Network addition was rejected by the user.", "warning");
		} else {
			showMessage("Error adding Amoy Testnet:", error);
		}
		return false;
	}
};

export const switchToAmoyNetwork = async (): Promise<boolean> => {
	if (await verifyMetamask()) return false;

	try {
		await window.ethereum.request({
			method: "wallet_switchEthereumChain",
			params: [{ chainId: "0x13882" }],
		});
		showMessage("Switched to the Amoy Testnet.", "success");
		return true;
	} catch (error: any) {
		if (error.code === 4902) {
			showMessage("Amoy Testnet not found. Adding network...", "info");
			const added = await addAmoyNetwork();
			if (added) {
				showMessage("Retrying network switch...", "info");
				return await switchToAmoyNetwork();
			}
		} else if (error.code === 4001) {
			showMessage("Please approve the request to switch to the Amoy Testnet.", "warning");
		} else {
			showMessage("Error switching network:", error);
		}
		return false;
	}
};

export const checkAndAddAmoyNetwork = async (): Promise<boolean> => {
	if (await verifyMetamask()) return false;

	try {
		const web3 = new Web3(window.ethereum);
		const chainId = Number(await web3.eth.getChainId());
		if (chainId === parseInt(AMOY_NETWORK.chainId, 16)) {
			return true;
		}
		return await switchToAmoyNetwork();
	} catch (error) {
		showMessage("Error checking or adding Amoy Network:", "error");
		return false;
	}
};
