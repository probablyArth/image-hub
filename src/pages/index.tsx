import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Image hub</title>
        <meta name="description" content="edit images, kind of" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Link
          className="rounded-xl bg-white/10 p-4 text-5xl font-extrabold tracking-tight text-white hover:bg-white/20 sm:text-[5rem]"
          href={"/images"}
        >
          Enter Site
        </Link>
      </main>
    </>
  );
};

export default Home;
