import Web3 from "web3";
import { showMessage } from "./showMessage";

export interface SendSignatureOptions {
    address: string;
    message: string;
}

export const sendSignature = async ({ address, message }: SendSignatureOptions): Promise<string | null> => {
    try {
        if (!window.ethereum) {
            showMessage("MetaMask not detected! Please install it.", "error");
            return null;
        }

        const web3 = new Web3(window.ethereum);

        const signature = await web3.eth.personal.sign(message, address, "");
        showMessage("Signature created successfully!", "success");

        return signature;
    } catch (error: any) {
        console.error("Error creating signature:", error);
        showMessage("Failed to create signature. Please try again.", "error");
        return null;
    }
};
