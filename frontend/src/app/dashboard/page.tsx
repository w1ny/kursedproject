"use client";
import styles from "./page.module.scss";
import { useEffect } from "react";
import { verifyWalletAuth } from "@/lib/verifyWalletAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
	const router = useRouter();

	useEffect(() => {
		const checkAuth = async () => {
			const isAutheticated = await verifyWalletAuth("/dashboard");

			if (!isAutheticated) router.push("/");
		};

		checkAuth();
	});

	return (
		<div className={styles.container_center}>
			<h1>DASHBOARD</h1>
			<Link href="/profile">Go to user profile</Link>
		</div>
	);
}
