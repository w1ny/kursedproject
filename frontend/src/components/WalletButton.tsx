"use client";
import React, { useState } from "react";
import { connectWalletToAmoy } from "../lib/walletConnect";
import { api } from "../services/api";
import { showMessage } from "@/lib/showMessage";
import Web3 from "web3";
import { sendSignature } from "@/lib/sendSignature";

interface WalletButtonProps {
	onWalletConnected?: (address: string | null) => void;
}

const WalletButton = ({ onWalletConnected }: WalletButtonProps) => {
	const [loading, setLoading] = useState(false);
	const [walletAddress, setWalletAddress] = useState<string | null>(null);

	const handleConnectWallet = async () => {
		setLoading(true);
		try {
			const walletData = await connectWalletToAmoy();
			setLoading(false);

			if (!walletData) {
				setWalletAddress(null);
				if (onWalletConnected) onWalletConnected(null);
				return;
			}

			setWalletAddress(walletData.address);

			const message = `Connect your wallet to use the Kursed World platform. Wallet Address: ${walletData.address}`;
			const signature = await sendSignature({address: walletData.address!, message});

			const response = await api.post(
				"/signup",
				{
					walletData: {
						...walletData,
						message,
						signature,
					},
				},
				{
					headers: {
						"Content-Type": "application/json",
						walletaddress: walletData.address,
					},
				}
			);

			if (response.status === 401) {
				showMessage("Signature verification failed.", "error");
				setWalletAddress(null);
				return;
			}

			if (response.status !== 201) throw new Error("Failed to save wallet data.");

			const kursedWorldStorage = { walletAddress: walletData.address };
			sessionStorage.setItem("kursed-world", JSON.stringify(kursedWorldStorage));

			console.log("Wallet data saved successfully:", response.data);
			if (onWalletConnected) onWalletConnected(walletData.address);
		} catch (error: any) {
			console.error("Error:", error);
			showMessage("Failed to connect or save wallet. Please try again.", "error");
			setWalletAddress(null);
			if (onWalletConnected) onWalletConnected(null);
		} finally {
			setLoading(false);
		}
	};

	return (
		<button type="button" onClick={handleConnectWallet} disabled={loading}>
			{loading ? "Connecting..." : walletAddress ? `Connected: ${walletAddress}` : "Connect your wallet!"}
		</button>
	);
};

export default WalletButton;
