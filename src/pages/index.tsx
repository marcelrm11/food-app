import Head from "next/head";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
// import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Food App</title>
        <meta
          name="description"
          content="Find recipes with the ingredients you have at home. Track what is about to expire and what you need to buy."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/marcel.ico" />
      </Head>
      <main className={inter.className}>
        <h1>My Food App</h1>
      </main>
    </>
  );
}
