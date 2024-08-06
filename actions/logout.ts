"use server"

import { signOut } from "@/auth"

export const logout = async () => {
    // perform any server logic here

    await signOut({
        redirectTo: "/auth/login",
    })
}

