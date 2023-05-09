import styles from "./page.module.css";
import Link from "next/link";
import Earth from "../../components/Earth";

export default function Home() {
  return (
    <div>
      <h1>Your new AI Navigator</h1>

      <Link href="/home" className={styles.btn}>
        Try Gypsy Maps
      </Link>

      <Earth />
    </div>
  );
}
