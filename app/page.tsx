import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col h-ful items-center justify-center">
      <h1 className="text-6xl font-semibold text-black drop-shadow-md">
        Auth
      </h1>
      <LoginButton>
        <Button variant='secondary' size='lg'>
          Sign in
        </Button>
      </LoginButton>
    </div>
  );
}
