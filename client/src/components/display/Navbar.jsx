import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth-context";
import Button from "../UI/Button";

const Navbar = () => {
  const { logoutHandler, loggedIn, loggedInUser } = useAuth();
  const navClass = "p-2 rounded-xl hover:bg-dirty-pink hover:text-sand";
  const activeNavClass =
    "p-2 rounded-xl underline underline-offset-4 hover:bg-dirty-pink hover:text-sand";
  return (
    <div className="w-full bg-sand text-metal flex justify-between items-center p-3 rounded-sm">
      <div className="p-2 font-bold text-md">Metamatch</div>
      <div className="grid grid-cols-4 gap-3 place-items-center">
        <NavLink
          to="/new-hero"
          className={({ isActive }) => (isActive ? activeNavClass : navClass)}
        >
          New Hero
        </NavLink>
        <NavLink
          to="/heroes"
          className={({ isActive }) => (isActive ? activeNavClass : navClass)}
        >
          Heroes
        </NavLink>
        {loggedIn && (
          <Button
            onClick={() => {
              logoutHandler();
            }}
            className="rounded-xl py-2"
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
