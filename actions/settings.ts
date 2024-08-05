import * as z from "zod"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { SettingsSchema } from "@/schemas"
import { getUserById } from "@/utils/user"

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const data = await auth()
    const user = data?.user

    if (!user) {
        return { error: "Unauthorized" }
    }

    const dbUser = await getUserById(user.id!)
    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    // don't allow changing email & password if OAuth
    if (user.isOAuth) {
        values.email = undefined
        values.password = undefined
        values.isTwoFactorEnabled = undefined
    }

    await db.user.update({
        where: { id: user.id },
        data: {
            ...values
        },
    })

    return { success: "User Updated!" }
}   