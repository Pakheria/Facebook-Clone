import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Navbar from "../components/navigation/navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Facebook App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
    <Navbar name="" />
    </div>
  )
}