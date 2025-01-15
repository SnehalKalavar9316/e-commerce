import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Camera as CameraIcon} from "lucide-react"
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Home from "./Views/Home";
import Signup from "./Views/Signup";
import Login from "./Views/Login";
import NotFound from './Views/404';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
  },
  {
    path:"/signup",
    element:<Signup/>,
  },
  {
    path:"/login",
    element:<Login/>,
  },
  {
    path:"*",
    element:<NotFound/>,
  },
])
root.render(
  <RouterProvider router={router}/>
 
 
  
);

