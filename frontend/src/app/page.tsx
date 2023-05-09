"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/home" className={styles.btn}>
        Try Gypsy Maps
      </Link>

      <script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@0.9.327/build/spline-viewer.js"
      ></script>
      <spline-viewer
        className={styles.spline}
        url="https://prod.spline.design/IkaM8VFGB5Mff2um/scene.splinecode"
      ></spline-viewer>
    </main>
  );
}
