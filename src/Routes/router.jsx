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
          element:<DashHome></DashHome>
        },
     ]
    },
  ]);