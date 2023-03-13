import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth-context";
import Button from "../UI/Button";

const Navbar = () => {
  const { logoutHandler, loggedIn, loggedInUser } = useAuth();
  const navClass = "p-2 rounded-sm hover:bg-dirty-pink hover:text-sand";
  return (
    <div className="w-full bg-sand text-metal flex justify-between items-center p-3 rounded-sm">
      <div className="p-2 font-bold text-md">Metamatch</div>
      <div className="grid grid-cols-4 gap-3 place-items-center">
        <Link to="/new-hero" className={navClass}>
          New Hero
        </Link>
        <Link to="/heroes" className={navClass}>
          Heroes
        </Link>
        {loggedIn && (
          <Button
            onClick={() => {
              logoutHandler();
            }}
            className={navClass}
          >
            Logout
          </Button>
        )}
        {loggedIn && <div> Hello, {loggedInUser.username} </div>}
        {!loggedIn && (
          <Link className={navClass} to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
