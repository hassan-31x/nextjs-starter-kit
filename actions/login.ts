"use server"

import { signIn } from "@/auth"
import { generateVerificationToken } from "@/lib/tokens"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "@/utils/user"
import { AuthError } from "next-auth"
import * as z from "zod"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.password) {
    return { error: "Invalid credentials" }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email)

    return { success: "Confirmation email sent" }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      //? for next-auth-beta.19: https://github.com/nextauthjs/next-auth/issues/9900#issuecomment-2228807677
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" }
        default:
          return { error: "An error occurred" }
      }
    }

    throw error;
  }


  return { success: "Login Successful" }
}