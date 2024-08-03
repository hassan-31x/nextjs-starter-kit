"use server"

import { db } from "@/lib/db"
import { NewPasswordSchema } from "@/schemas"
import { getResetPasswordTokenByToken } from "@/utils/reset-password-token"
import { getUserByEmail } from "@/utils/user"
import bcrypt from "bcryptjs"
import * as z from "zod"

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) return { error: "Missing token" }

  const validatedFields = NewPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  const { password } = validatedFields.data

  const existingToken = await getResetPasswordTokenByToken(token)
  if (!existingToken) {
    return { error: "Invalid token" }
  }

  const hasExpired = new Date() > existingToken.expires
  if (hasExpired) {
    return { error: "Token has expired" }
  }

  const existingUser = await getUserByEmail(existingToken.email)
  if (!existingUser) {
    return { error: "User not found" }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword
    }
  })

  await db.resetPasswordToken.delete({
    where: { id: existingToken.id }
  })

  return { success: "Password updated" }
}