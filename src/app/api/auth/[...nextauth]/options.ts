import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username: ",
          type: "text",
          placeholder: "Enter Username",
        },
        password: {
          label: "Password: ",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials) {
        const user = {
          id: "1",
          name: "jeylan",
          password: "jeylan123",
        };

        if (
          credentials?.username == user.name &&
          credentials?.password == user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
};
