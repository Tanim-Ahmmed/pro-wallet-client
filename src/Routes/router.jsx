import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../Pages/Shared/ErrorPage";
import Home from "../Pages/Home/Home";
import Dashboard from "../layouts/Dashboard";
import DashHome from "../Pages/dashboard/DashHome";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import ManageUsers from "../Pages/dashboard/Admin/ManageUsers";
import CashIn from "../Pages/dashboard/Agent/CashIn";
import CashOut from "../Pages/dashboard/Users/CashOut";
import SendMoney from "../Pages/dashboard/Users/SendMoney";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";
import ManageAgents from "../Pages/dashboard/Admin/ManageAgents";
import Transactions from "../Pages/Transactions/Transactions";
import UsersTransactions from "../Pages/dashboard/Admin/UsersTransactions";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
      children: [
        {
            path:'/',
            element:<Home></Home>,
        },
        {
            path:"/login",
            element:<Login></Login>,
        },
        {
            path:"/register",
            element:<Register></Register>,
        },
      ]
    },
    {
     path: "/dashboard",
     element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
     children:[
        {
          path:'',
          element:<PrivateRoutes><DashHome></DashHome></PrivateRoutes>,
        },
        {
          path:"manage-users",
          element: <PrivateRoutes><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoutes>,
        },
        {
           path:"manage-agents",
           element:<PrivateRoutes><AdminRoute><ManageAgents></ManageAgents></AdminRoute></PrivateRoutes>
        },
        {
          path:"user-transactions/:phone",
          element:<PrivateRoutes><AdminRoute><UsersTransactions></UsersTransactions></AdminRoute></PrivateRoutes>
        },
        {
          path:"cash-in",
          element:<PrivateRoutes><AgentRoute><CashIn></CashIn></AgentRoute> </PrivateRoutes>,
        },
        {
          path:"cash-out",
          element:<PrivateRoutes><CashOut></CashOut></PrivateRoutes>,
        },
        {
          path:"send-money",
          element:<PrivateRoutes><SendMoney></SendMoney></PrivateRoutes>
        },
        {
          path:'transactions',
          element: <PrivateRoutes><Transactions></Transactions> </PrivateRoutes>
        }
     ]
    },
  ]);