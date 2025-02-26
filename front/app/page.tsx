"use client";
import styles from "./page.module.css";
import {  useTestData } from "@/utils/api";

export default function Home() {
  const {data, loading} = useTestData();

  if (loading) {
    return <div> Loading... </div>;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li>Connected to backend: {data}.</li>
        </ol>
      </main>
    </div>
  );
}
