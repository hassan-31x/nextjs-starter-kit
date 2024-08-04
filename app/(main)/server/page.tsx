import { auth } from "@/auth";

const ServerPage = async () => {
  const session = await auth();
  const user = session?.user;

  return <div>{JSON.stringify(user)}</div>;
};

export default ServerPage;
