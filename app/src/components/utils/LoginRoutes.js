import { BrowserRouter, Route, Routes, Navigate, Outlet  } from "react-router-dom";

const LoginRoutes = () => {
  // let auth = sessionStorage.getItem("admin")
  console.log(sessionStorage.getItem("username"))
  console.log()
  return(
    sessionStorage.getItem("username") ? <Outlet/> : <Navigate to="/"/>
  )
}

export default LoginRoutes