import { BrowserRouter, Route, Routes, Navigate, Outlet  } from "react-router-dom";
import GroupManagement from "./components/GroupManagement";
import Dashboard2 from "./components/Dashboard2";
import TaskManagement from "./components/TaskManagement";
import Login from "./components/Login";
import Login2 from "./components/Login2";
import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";
import Register from "./components/Register";
import Profile from "./components/Profile";
import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import AdminRoutes from "./components/utils/AdminRoutes";

function App() {

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    refreshToken()
}, []);

const refreshToken = async () => {
  try {
      const response = await axios.get('http://localhost:5000/token');
      const decoded = jwt_decode(response.data.accessToken);
      console.log("APPPPPPPPPPPPPPPPP")
      console.log(decoded.username);
      console.log(decoded.username == "Admin");
      if (decoded.username == "Admin") {
        setAdmin(true)
      }
      // console.log(decoded.username == "admin")c
      console.log(admin)

  } catch (error) {
      if (error.response) {
        console.log(error.response)
      }
  }

 
}
  return (
    <BrowserRouter>
    <Navbar2 />
      <Routes>
        <Route element={<AdminRoutes />}>
        <Route path="/usermanagement" element={<Dashboard2 />}/>
        <Route path="/groupmanagement" element={<GroupManagement />}/>
        </Route>



      <Route path="/" element={<Login2 />}/>
        {/* <Route path="/" element={<Login setUsername={setUsername} setAdmin={setAdmin}/>}/> */}
        <Route path="/register" element={<Register />}/>
        {/* <Route path="/dashboard" element={admin ? <Dashboard /> : <DashboardUser />}/> */}
        <Route path="/dashboard" element={<TaskManagement />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  );


}
 
export default App;