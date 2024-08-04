import UserButton from "@/components/auth/user-button"

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 rounded-xl w-full max-w-[1000px] border shadow-sm">
        <div></div>
        <UserButton />
    </nav>
  )
}

export default Navbar