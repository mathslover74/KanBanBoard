import { BrowserRouter, Route, Routes, useNavigate, Outlet  } from "react-router-dom";
import GroupManagement from "./components/group/GroupManagement";
import Dashboard2 from "./components/user/UserManagement";
import TaskManagement from "./components/TaskManagement";
import Login from "./components/Login";
import Login2 from "./components/Login2";
import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";
import Register from "./components/Register";
import Profile from "./components/profile/Profile";
import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import AdminRoutes from "./components/utils/AdminRoutes";
import Forbidden from "./components/Forbidden";
import ApplicationManagement from "./components/app/ApplicationManagement";
import Application from "./components/app/Application";
import UserManagement from "./components/user/UserManagement";
function App() {

  const [admin, setAdmin] = useState(false);
  // const navigate = useNavigate();

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
        <Route path="/usermanagement" element={<UserManagement />}/>
        <Route path="/groupmanagement" element={<GroupManagement />}/>
        </Route>



      <Route path="/" element={<Login2 />}/>
        {/* <Route path="/" element={<Login setUsername={setUsername} setAdmin={setAdmin}/>}/> */}
        {/* <Route path="/register" element={<Register />}/> */}
        {/* <Route path="/dashboard" element={admin ? <Dashboard /> : <DashboardUser />}/> */}
        <Route path="/dashboard" element={<ApplicationManagement />}/>
        <Route path="/profile" element={<Profile />}/>
        {/* <Route path="/application" element={<ApplicationManagement />}/> */}
        <Route path="/application/:id" element={<Application/>}/>
        {/* <Route path="/plan" element={<Profile />}/> */}
        <Route path="*" element={<Forbidden />} />
      </Routes>
    </BrowserRouter>
  );


}
 
export default App;