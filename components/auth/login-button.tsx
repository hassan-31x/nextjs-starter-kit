"use client"

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import LoginForm from "@/components/auth/login-form";

type Props = {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const LoginButton = ({
  children,
  mode = "modal",
  asChild = false,
}: Props) => {
  const router = useRouter()
  
  const handleClick = () => {
    router.push("/auth/login")
  }

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent hideClose={true} className="p-0 w-max rounded-xl">
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  )
}

export default LoginButton