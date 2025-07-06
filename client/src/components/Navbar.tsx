import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <div className="flex justify-between items-center">
      {/* Logo & Navgiations */}
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center">
          {/* D */}
          <div className="text-[#0957CB] text-5xl">D</div>
          {/* Anke Schon */}
          <div className="leading-tight">
            <p>anke</p>
            <p>schon</p>
          </div>
        </Link>
      </div>

      {/* Buttons */}
      <div className="dropdown w-12 h-12 cursor-pointer">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <img
            role="button"
            src={user?.avatar || "/avatar-placeholder.jpeg"}
            alt={`${user?.username}-avatar`}
            className="w-full h-full rounded-full"
          />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/create-property">Create Property Post</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
