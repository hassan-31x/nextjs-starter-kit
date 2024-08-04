import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.BASE_URL}/auth/verify-email?token=${token}`

  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: email, // can only be sent to registered email on resend for now
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
  })
}

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.BASE_URL}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: email, // can only be sent to registered email on resend for now
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  })
}

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: email, // can only be sent to registered email on resend for now
    subject: "Two Factor Code",
    html: `<p>Your two factor code is: ${token}</p>`
  })
}