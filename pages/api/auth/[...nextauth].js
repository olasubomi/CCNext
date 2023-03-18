import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";


export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: "165606613965-tqs2kpvpf4feni7i6mugs1naa40c59r4.apps.googleusercontent.com",
            clientSecret: "tMk07jkNWHycFR4y85QH8yEy",
        }),
        // ...add more providers here
    ],
})