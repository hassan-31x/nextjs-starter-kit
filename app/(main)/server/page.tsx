import { auth } from "@/auth";

const ServerPage = async () => {
  const session = await auth(); // server function, hence can also be used in api routes
  const user = session?.user;

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};

export default ServerPage;
