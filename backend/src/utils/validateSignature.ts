import Web3 from "web3";

export const validateSignature = (message: string, address: string, signature: string): boolean => {
    try {
        const web3 = new Web3();
        const recoveredAddress = web3.eth.accounts.recover(message, signature);

        return recoveredAddress.toLowerCase() === address.toLowerCase();
    } catch (error) {
        console.error("Error validating signature:", error);
        return false;
    }
};
