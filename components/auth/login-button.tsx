"use client"

import { useRouter } from "next/navigation";

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
      <span>MODAL</span>
    )
  }

  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  )
}

export default LoginButton