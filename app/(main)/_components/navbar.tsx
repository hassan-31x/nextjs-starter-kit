"use client";

import UserButton from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center p-4 rounded-xl w-full max-w-[1000px] border shadow-sm">
      <div className="flex gap-x-2">
        <Button asChild variant={pathname.startsWith("/server") ? "default" : "outline"}>
          <Link href="/server">Server</Link>
        </Button>
        <Button asChild variant={pathname.startsWith("/client") ? "default" : "outline"}>
          <Link href="/client">Client</Link>
        </Button>
        <Button asChild variant={pathname.startsWith("/settings") ? "default" : "outline"}>
          <Link href="/settings">Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};

export default Navbar;
