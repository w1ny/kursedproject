"use client"
import { showMessage } from "./showMessage";

export const verifyMetamask = async () => {
	try {
		if (typeof window.ethereum === "undefined") {
			showMessage("MetaMask not detected! Please install it.");
			return true;
		}
		return false;
	} catch (error) {
		console.error("Error verifying MetaMask:", error);
		return true;
	}
};
