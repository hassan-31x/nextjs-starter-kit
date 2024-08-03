"use server"

import * as z from "zod"

import { ResetPasswordSchema } from "@/schemas"
import { getUserByEmail } from "@/utils/user"
import { generatePasswordResetToken } from "@/lib/tokens"
import { sendResetPasswordEmail } from "@/lib/mail"

export const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
  const validatedFields = ResetPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  const { email } = validatedFields.data
  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: "User not found" }
  }

  const resetPasswordToken = await generatePasswordResetToken(email)
  await sendResetPasswordEmail(email, resetPasswordToken.token)

  return { success: "Password reset email sent" }
}