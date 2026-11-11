import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Keep provider credentials on the server. The Google OAuth integration is
// disabled until its server-side identity verification and account linking
// flow is reviewed. Do not hardcode client secrets in source control.
const providers =
  process.env.ENABLE_VERIFIED_GOOGLE_AUTH === "true" &&
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET
    ? [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
      ]
    : [];

export default NextAuth({ providers });
