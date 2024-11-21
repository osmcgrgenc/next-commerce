import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// Prisma istemcisi
const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma), // Prisma adaptörü kullanımı
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Kullanıcı doğrulama örneği
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        // Bu örnekte kullanıcı manuel olarak kontrol ediliyor.
        if (username === "admin" && password === "password123") {
          return { id: "1", name: "Admin", email: "admin@example.com" };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Özel giriş sayfası
    signOut: "/auth/signout", // Özel çıkış sayfası
    error: "/auth/error", // Hata sayfası
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      // Oturum sırasında kullanıcı bilgilerini token'dan ekleme
      if (session.user) {
        // Kullanıcı tipini genişletme
        (session.user as { id?: string }).id = token.sub as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Kullanıcı bilgilerini token'a ekleme
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
