/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditForm from './EditForm';
import CreateForm from '../CreateForm';
import Welcome from './Welcome';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';


 
const Dashboard = () => {
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [submit, setSubmit] = useState(false)
    const navigate = useNavigate();
 
    useEffect(() => {
        refreshToken();
    }, []);
    
    useEffect(() => {
        setSubmit(false)
        getGroup()
        getUsers();
    }, [submit]);

    const getGroup = async () => {
        console.log("get group")
        // const response = await axiosJWT.get('http://localhost:5000/viewUser', {
        
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        const response = await axiosJWT.get('http://localhost:5000/viewGroup', {
            headers: {
              Authorization: `Bearer ${token}`
          }
        });
        console.log(response);
        console.log(response.data)
        setGroupList(response.data)
        console.log("dashboard get user------------------------")
        console.log(groupList)
        // console.log(grouplist2)
    }


 
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            console.log("refresh token")
            console.log(decoded);
            setUsername(decoded.username);
            setExpire(decoded.exp);
            // console.log("refreshToken")
            // console.log(decoded.username)
            // if(decoded.username == "admin") {
            //     navigate("/dashboard");
            // } else {
            //     navigate("/dashboarduser");
            // }
        } catch (error) {
            if (error.response) {
                
            }
        }
    }
 
    const axiosJWT = axios.create();
 
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
 
    const getUsers = async () => {
        console.log("get user")
        const response = await axiosJWT.get('http://localhost:5000/viewUser', {
        // const response = await axios.get('http://localhost:5000/viewusers', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        console.log(response.data);
        setUsers(response.data);
    }
 
    return (
        <>
        <div>
      <div className= 'topNav'>
        <Welcome />
        <br></br>
        <Typography variant="h2" align="center">User management system</Typography>
        <Typography align="center">
            
        {/* <Link to={'/recipe/new'} > */}
        {/* <Button variant='contained' color='primary' >Create New User</Button> */}
        {/* <Button variant='contained' color='primary' >Create New User</Button> */}
        <CreateForm token={token}setSubmit={setSubmit} groupList={groupList}/>
        {/* </Link> */}
        </Typography>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Group</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <EditForm setSubmit={setSubmit} groupList={groupList} token={token} userGroup={user.group_name} username={user.username} email={user.email} status={user.status} index={index}/>
            // <TableRow
            //   key={user.user}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            // >
            //   <TableCell component="th" scope="row">
            //     {index + 1}
            //   </TableCell>
            //   <TableCell align="right">{user.username}</TableCell>
            //   <TableCell align="right">{user.email}</TableCell>
            //   <TableCell align="right">{user.status}</TableCell>
            //   <TableCell align="right">edit</TableCell>
            // </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        {/* <MyRecipes recipes={recipes} /> */}
      </div>
    </div>
        </>
    )
}
 
export default Dashboard


