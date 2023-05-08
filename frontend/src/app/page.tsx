"use client";

import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  var raw = JSON.stringify({
    DeparturePosition: [77.14287, 28.67554],
    DestinationPosition: [77.31647, 28.65956],
    DepartureTime: "2023-05-08T23:47:25.244718",
  });

  var requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: raw,
    redirect: "follow",
  };

  fetch("http://127.0.0.1:8000/api/getRoute/", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  return <main className={styles.main}></main>;
}
