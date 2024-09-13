import NextAuth from "next-auth";
import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile, user, account }) {
      if (
        user &&
        profile &&
        account &&
        (account.provider === "google" ||
          account.provider === "facebook" ||
          account.provider === "github")
      ) {
        const { name, email, image } = user;
        const uid = profile.id || profile.sub;

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Login/User`, {
            method: "POST",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              uid,
              image,
            }),
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();

          if (data.isdeleteuserrequest) {
            // Redirect to /RestoreUser if isdeleteuserrequest is true
            // Include the username as a query parameter
            return `/RestoreUser/${encodeURIComponent(data.username)}`;
          }

          user.username = data.username;
          user.name = data.name; // Update the session with the name
          user.image = data.image;

          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          console.log(error);
        }

        return true; // Allow sign-in
      } else {
        return false; // Deny sign-in
      }
    },

    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      if (user) {
        token.username = user.username;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      // Add additional user information to the session object
      session.user.username = token.username;
      session.user.name = token.name;
      session.user.image = token.image;

      return session;
    },
  },
});
