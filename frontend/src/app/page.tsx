"use client"
import WalletButton from "../components/WalletButton";
import styles from "./page.module.scss";
import logoImg from "../../public/next.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Page() {
    const router = useRouter();
    
    const handleWalletConnected = (address: string | null) => {
        if (address) {
            console.log(`Wallet connected: ${address}`);
            router.push("/dashboard")
        }
    };

    return (
        <div className={styles.container_center}>
            <Image src={logoImg} alt="Kursed Logo" priority />
            <section className={styles.login}>
                <WalletButton onWalletConnected={handleWalletConnected} />
            </section>
        </div>
    );
}
