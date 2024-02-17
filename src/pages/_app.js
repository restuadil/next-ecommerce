import Navbar from '@/components/Navbar/Navbar'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const disabledNavbar = ['auth', 'admin']
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const { pathname } = useRouter()
  return (
    <SessionProvider session={session}>
      {disabledNavbar.includes(pathname.split('/')[1]) ? null : <Navbar />}
      <Component {...pageProps} />
    </SessionProvider>
  )
}
