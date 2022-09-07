/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditProfile from './EditProfile';
import Welcome from './Welcome';

 
const Profile = () => {
    
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [submit, setSubmit] = useState(false)
    const navigate = useNavigate();
    const axiosJWT = axios.create();

 
    useEffect(() => {
      console.log("Refresh token")
        refreshToken();
        // getOneUser()
      }, []);
      
      useEffect(() => {
        setSubmit(false)
        getOneUser()
    }, [submit]);

    const getOneUser = async () => {
        console.log("get one user")
        console.log(sessionStorage.getItem("username"))
        // const response = await axios.get('http://localhost:5000/viewGroup', {
    
        // });
        try {
          const response = await axiosJWT.post(`http://localhost:5000/viewOneUser` ,
          {
            username: sessionStorage.getItem("username")
            // username: "1233333"
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
          )
          // if(response.data)
          console.log(response)
          console.log(response.data[0])
          setUsers(response.data);
        } catch(e) {
          console.log(e)
          console.log(e.response.data.message)
        }

        // // console.log(response.data);
        // setGroupList(response.data)
        // console.log("dashboard get user------------------------")
        // console.log(groupList)
        // // console.log(grouplist2)
    }


 
    const refreshToken = async () => {
      try {
          const response = await axios.get('http://localhost:5000/token');
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          // console.log("TOKEN REFRESHED2 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
          // console.log(response.data.accessToken)
          // console.log("refresh token")
          console.log(decoded);
          setUsername(decoded.username);
          setExpire(decoded.exp);
          // console.log("TOKEN REFRESHED @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
          // console.log(token)
          // console.log("refreshToken")
          // console.log(decoded.username)
          // if(decoded.username == "admin") {
          //     navigate("/dashboard");
          // } else {
          //     navigate("/dashboarduser");
          // }
      } catch (error) {
          if (error.response) {
              navigate("/");
          }
      }
  }
 
 
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            console.log("Token interceptor")
            setUsername(decoded.username);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
 
    return (
        <>
        <div>
      <div className= 'topNav'>
        <Welcome />
        <br></br>
        <Typography variant="h2" align="center">My Profile</Typography>
        <Typography align="center">

        </Typography>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Group</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => ( 
            <EditProfile setSubmit={setSubmit} groupList={groupList} token={token} userGroup={user.group_name} username={user.username} email={user.email}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    </div>
        </>
    )
}
 
export default Profile


