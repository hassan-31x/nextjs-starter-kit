"use client";

import { useSession } from "next-auth/react";

const ClientPage = () => {
  const { data: session } = useSession();
  
  return <div>{JSON.stringify(session?.user)}</div>;
};

export default ClientPage;
