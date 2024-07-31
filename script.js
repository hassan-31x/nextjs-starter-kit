import { PrismaClient } from "@prisma/client";

const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = db

const send = async () => {

  // const verificationToken = await db.verificationToken.create({
  //   data: {
  //     token: 'token',
  //     email: 'email',
  //     expires: new Date(),
  //   }
  // })
  // console.log("🚀 ~ send ~ verificationToken:", verificationToken)

  const tokens = await db.verificationToken.findMany()
  console.log(tokens)
}
send()