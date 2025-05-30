import { createBrowserRouter, Router ,Navigate} from "react-router-dom";

import GuestLayout from "./Layouts/GuestLayout";
import DefaultLayout from "./Layouts/DefaultLayout";
import Notfound from "./Views/Notfound";
import Login from "./Views/Login";
import Users from "./Views/Users";
import Dashboard from "./Views/Dashboard";
import Signup from "./Views/Signup";


const router = createBrowserRouter([
    //Route for default
    {
        path: '/',
        element: <DefaultLayout/>,
        children:[
            {
                path: '/',
                element: <Navigate to="/users"/>,
            },
            {
                path: '/users',
                element: <Users/>,
            },
            {
                path: '/dashboard',
                element: <Dashboard/>,
            }
        ]


    },
    {
        path: '/',
        element: <GuestLayout/>,
        children:[
            {
                path: '/login',
                element: <Login/>,
            },
            {
                path: '/signup',
                element: <Signup/>,
            }
        ]


    },
     {
        path: '*',
        element: <Notfound/>

    }
    
])
export default router;