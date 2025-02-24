
import { Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const Navbar = () => {
  const { user, logOut } = useAuth();
  return (
    <div className="fixed text-base-900 top-0 left-0 right-0  bg-base-100 z-50 py-2 backdrop-blur-xl h-20 opacity-90">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          <Link
            to="/"
            className=" hover:cursor-pointer text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent pl-4"
          >
            ProWallet
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-end">
            {user?.email ? (
              <button
                onClick={logOut}
                className="px-6 py-2 text-red-600 border border-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all"
              >
                Sign Out
              </button>
           ) : ( 
              <Link
                to="/login"
                className="px-6 py-2 text-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-all"
              >
                Sign In
              </Link>
             )} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
