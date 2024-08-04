import { auth } from "@/auth";

const ServerPage = async () => {
  const session = await auth(); // server function, hence can also be used in api routes
  const user = session?.user;

  return <div>{JSON.stringify(user)}</div>;
};

export default ServerPage;
