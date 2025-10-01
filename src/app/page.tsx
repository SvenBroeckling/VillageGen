import Link from "next/link";
import { Button } from "@mantine/core";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Button>Click me</Button>
      <Link href="/create">Create</Link>
    </div>
  );
}
