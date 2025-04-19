import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Only allow specific email to sign in from environment variable
      return user.email === process.env.ADMIN_EMAIL;
    },
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      
      const { pathname } = new URL(request.url);
      
      if (pathname.startsWith("/admin")) {
        if (isLoggedIn) return true;
        return false; 
      }

      return true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
})