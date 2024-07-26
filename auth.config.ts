//? This file is used because middleware runs on edge but prisma does not support edge so to achieve extra callbacks provided, we use this file

import Github from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"

export default {
  providers: [Github],
} satisfies NextAuthConfig