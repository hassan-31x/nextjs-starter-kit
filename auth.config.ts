//? This file is used because middleware runs on edge but prisma does not support edge so to achieve extra callbacks provided, we use this file

import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs"

import { getUserByEmail } from "@/utils/user"
import { LoginSchema } from "@/schemas"

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (!validatedFields.success) {
          return null
        }

        const { email, password } = validatedFields.data

         const user = await getUserByEmail(email)
         if (!user || !user.password) return null

         const isValid = await bcrypt.compare(password, user.password)

         if (!isValid) return null

          return user
      }
    })
  ],
} satisfies NextAuthConfig