"use client";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { verifyWalletAuth } from "@/lib/verifyWalletAuth";
import { useRouter } from "next/navigation";

export default function Profile() {
	const router = useRouter();
	const [data, setData] = useState({ username: "", wallet: { address: "" } });

	useEffect(() => {
		const checkAuth = async () => {
			const result = await verifyWalletAuth("/profile");
			if (!result) {
				router.push("/");
			} else {
				console.log(result.data);
				setData(result.data);
			}
		};

		checkAuth();
	}, []);

	return (
		<div className={styles.container_center}>
			<h1>PROFILE</h1>
			{data.username ? <p>Username: {data.username}</p> : <p>Loading...</p>}
			{data.wallet.address ? <p>Wallet: {data.wallet.address}</p> : <p>Loading...</p>}
		</div>
	);
}
