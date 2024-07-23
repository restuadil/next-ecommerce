import { loginWithGoogle, signIn } from "@/services/auth/services";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        npp: { label: "npp", type: "npp" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { npp, password } = credentials;
        const user = await signIn(npp);
        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
          return null;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.username = user.username;
        token.npp = user.npp;
        token.role = user.role;
      }
      if (account?.provider === "google") {
        const data = {
          username: user.name,
          email: user.email,
          type: "google",
        };
        await loginWithGoogle(data, (data) => {
          token.email = data.email;
          token.username = data.username;
          token.role = data.role;
        });
      }
      return token;
    },
    async session({ session, token }) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("username" in token) {
        session.user.username = token.username;
      }
      if ("npp" in token) {
        session.user.npp = token.npp;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
