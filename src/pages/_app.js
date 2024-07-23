import Navbar from "@/components/Navbar/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

const disabledNavbar = ["auth", "admin", "staff"];
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const { pathname } = useRouter();
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
