import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    authorized({ auth }) {
      // All routes are public by default — auth only needed for saving itineraries
      return true;
    },
  },
  pages: {
    signIn: "/",
  },
});
