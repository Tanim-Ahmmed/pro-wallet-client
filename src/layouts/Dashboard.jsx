import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import useAgent from "../hooks/useAgent";
import { FaFilterCircleDollar } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { BsCashCoin, BsFileEarmarkPerson, BsFillSendCheckFill } from "react-icons/bs";
const Dashboard = () => {
  const { user,logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const [isAgent] = useAgent();
    return (
    
        <div className="bg-base-300">
          <div className="sm:flex max-w-7xl mx-auto ">
        <div className="sm:w-64 sm:min-h-screen bg-base-200 pt-6">
          <div className="flex justify-between items-center p-3">
            <Link to="/"  className=" hover:cursor-pointer text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent pl-4">
              ProWallet
            </Link>
            <div>
              <p>{user?.displayName}</p>
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
                  <BsFileEarmarkPerson />Manage Agents
                  </NavLink>
                </li>
              </>
            ) : isAgent? (
              <>
                <li>
                  <NavLink to="/dashboard/cash-in">
                  <FaFilterCircleDollar /> Cash In
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
              </>
            )}
  
            <div className="divider"></div>
            <li>
              <NavLink to="/">
              
                <IoIosHome/> Home
              </NavLink>
            </li>
            <li>
              <button 
              onClick={logOut}
              >
              
              <IoLogOutOutline /> LogOut
              </button>
            </li>
          </ul>
        </div>
        <div className="flex-1 min-h-screen  bg-gradient-to-br from-indigo-50 to-purple-50">
          <Outlet></Outlet>
        </div>
        </div>
      </div>
    );
};

export default Dashboard;