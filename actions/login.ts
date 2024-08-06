"use server"

import { signIn } from "@/auth"
import { db } from "@/lib/db"
import { sendTwoFactorEmail, sendVerificationEmail } from "@/lib/mail"
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import { getTwoFactorConfirmationByUserId } from "@/utils/two-factor-confirmation"
import { getTwoFactorTokenByEmail } from "@/utils/two-factor-token"
import { getUserByEmail } from "@/utils/user"
import { AuthError } from "next-auth"
import * as z from "zod"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  const { email, password, code } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.password) {
    return { error: "Invalid credentials" }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(email, verificationToken.token)

    return { success: "Confirmation email sent" }
  }
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

      if (!twoFactorToken || twoFactorToken.token !== code) {
        return { error: "Invalid two factor code" }
      }

      const hasExpired = new Date() > twoFactorToken.expires
      if (hasExpired) {
        return { error: "Two factor code has expired" }
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id }
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id }
        })
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id
        }
      })
    } else {

      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorEmail(existingUser.email, twoFactorToken.token)
      
      return { twoFactor: true}
    }
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