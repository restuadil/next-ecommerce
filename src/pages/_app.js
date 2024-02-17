import Navbar from '@/components/Navbar/Navbar'
import SideBar from '@/components/Sidebar/SideBar'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'

const disabledNavbar = ['auth', 'admin']
const ableSidebar = ['admin']
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const { pathname } = useRouter()
  return (
    <SessionProvider session={session}>
      {disabledNavbar.includes(pathname.split('/')[1]) ? null : <Navbar />}
      {ableSidebar.includes(pathname.split('/')[1]) ? <SideBar /> : null}
      <Component {...pageProps} />
    </SessionProvider>
  )
}
