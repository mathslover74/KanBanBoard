import { BrowserRouter, Route, Routes, Navigate, Outlet  } from "react-router-dom";

const AdminRoutes = () => {
  // let auth = sessionStorage.getItem("admin")
  console.log(sessionStorage.getItem("admin"))
  return(
    sessionStorage.getItem("admin") ? <Outlet/> : <Navigate to="/dashboard"/>
  )
}

export default AdminRoutes