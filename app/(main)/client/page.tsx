"use client";

import { useSession } from "next-auth/react";

const ClientPage = () => {
  const session = useSession();
  const user = session?.data;
  
  return <div>{JSON.stringify(user)}</div>;
};

export default ClientPage;
