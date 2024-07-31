"use server"

import { db } from "@/lib/db"
import { getUserByEmail } from "@/utils/user"
import { getVerificationTokenByToken } from "@/utils/verification-token"

export const verifyEmail = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token)
  if (!existingToken) {
    return { error: "Invalid token" }
  }
  
  const hasExpired = new Date() > existingToken.expires
  if (hasExpired) {
    return { error: "Token has expired" }
  }
  
  const existingUser = await getUserByEmail(existingToken.email)
  if (!existingUser) {
    return { error: "Emaill does not exist" }
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email
    }
  })

  await db.verificationToken.delete({
    where: { id: existingToken.id }
  })

  return { success: "Email verified" }
}