"use client";

import { useSession } from "next-auth/react";

const ClientPage = () => {
  const { data: session } = useSession();
  
  return <pre>{JSON.stringify(session?.user, null, 2)}</pre>;
};

export default ClientPage;
