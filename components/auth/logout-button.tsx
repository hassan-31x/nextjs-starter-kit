import { logout } from "@/actions/logout";

type Props = {
  children: React.ReactNode;
};

const LogoutButton = ({ children }: Props) => {

  const handleLogout = () => {
    logout();
  };

  return (
    <span onClick={handleLogout} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LogoutButton;
