import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import useAgent from "../hooks/useAgent";
import { FaCommentDollar, FaFilterCircleDollar } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import {
  BsCashCoin,
  BsFileEarmarkPerson,
  BsFillSendCheckFill,
} from "react-icons/bs";
import useCurrentUser from "../hooks/useCurrentUser";
const Dashboard = () => {
  const { logOut } = useAuth();
  const [currentUser] = useCurrentUser();
  const [isAdmin] = useAdmin();
  const [isAgent] = useAgent();

  return (
    <div className="sm:flex bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="sm:w-64 sm:min-h-screen bg-base-200 pt-6">
        <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md rounded-lg">
          {/* Left Section */}
          <div className="flex flex-col pl-4">
            <Link
              to="/"
              className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              ProWallet
            </Link>
            <div className="flex text-right pr-4 space-x-4 py-4">
            <p
              className={`text-sm font-semibold px-3 py-1 rounded-md inline-block ${
                isAdmin
                  ? "bg-red-500 text-white"
                  : isAgent
                  ? "bg-yellow-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {isAdmin ? "Admin" : isAgent ? "Agent" : "User"}
            </p>
            <p className="text-lg  font-medium text-gray-800">
              {currentUser?.name}
            </p>
          </div>
          <h2 className="text-lg font-semibold text-gray-700">
        Balance: ${currentUser?.balance || "0.00"}
      </h2>
          </div>

        
        </div>

        <div className="divider"></div>
        <ul className="menu p-4 space-y-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/manage-users">
                  <FaUsers /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-agents">
                  <BsFileEarmarkPerson />
                  Manage Agents
                </NavLink>
              </li>
            </>
          ) : isAgent ? (
            <>
              <li>
                <NavLink to="/dashboard/cash-in">
                  <FaFilterCircleDollar /> Cash In
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/transactions">
                <FaCommentDollar /> Transactions
                </NavLink>
              </li>
              
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/send-money">
                  <BsFillSendCheckFill /> Send Money
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cash-out">
                  <BsCashCoin /> Cash Out
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/transactions">
                <FaCommentDollar /> transactions
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <IoIosHome /> Home
            </NavLink>
          </li>
          <li>
            <button onClick={logOut}>
              <IoLogOutOutline /> LogOut
            </button>
          </li>

          
        
        </ul>
      </div>
      <div className="flex-1 max-w-7xl mx-auto min-h-screen  ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
