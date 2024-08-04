"use client";

import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import FormError from "@/components/form-error";

type Props = {
  children: React.ReactNode;
  allowedRoles: UserRole[];
};

const RoleGate = ({ children, allowedRoles }: Props) => {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  if (!allowedRoles.includes(userRole!)) {
    return <FormError message="You do not have permission to access this content" />;
  }

  return <>{children}</>;
};

export default RoleGate;
