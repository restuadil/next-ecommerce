import { loginWithGoogle, signIn } from "@/lib/firebase/service"
import { compare } from "bcrypt"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

const authOptions = {
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials
                const user = await signIn(email)
                if (user) {
                    const passwordConfirm = await compare(password, user.password)
                    if (passwordConfirm) {
                        return user
                    }
                    return null
                } else {
                    return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || ""
        })
    ],
    callbacks: {
        async jwt({ token, account, profile, user }) {
            if (account?.provider === "credentials") {
                token.email = user.email
                token.fullname = user.fullname
                token.phone = user.phone
                token.role = user.role
            }
            if (account?.provider === "google") {
                const data = {
                    fullname: user.name,
                    email: user.email,
                    type: "google",
                }
                await loginWithGoogle(data, (data) => {
                    token.email = data.email
                    token.fullname = data.fullname
                    token.role = data.role
                })
            }
            return token
        },
        async session({ session, token }) {
            if ("email" in token) {
                session.user.email = token.email
            }
            if ("fullname" in token) {
                session.user.fullname = token.fullname
            }
            if ("phone" in token) {
                session.user.phone = token.phone
            }
            if ("role" in token) {
                session.user.role = token.role
            }

            return session
        }
    },
    pages: {
        signIn: "/auth/login"
    }
}

export default NextAuth(authOptions)