import { api } from "../services/api";
import { showMessage } from "./showMessage";

export const verifyWalletAuth = async (endpoint: string): Promise<any> => {
	try {
        const storedData = JSON.parse(sessionStorage.getItem("kursed-world") || "{}");
		const walletAddress = storedData.walletAddress;

		if (!walletAddress) showMessage("Wallet not connected. Redirecting to login.", "error");

		const response = await api.get(endpoint, {
			headers: {
				walletaddress: walletAddress,
			},
		});

		if (response.status === 200) return response;
		else return false;
	} catch (error: any) {
		if (error.response?.status === 401) {
			showMessage("Unauthorized access. Redirecting to login.", "warning");
		} else {
			console.error("Error verifying wallet authentication:", error);
			showMessage("Error verifying wallet. Try again later.", "error");
		}
	}

	return false;
};
