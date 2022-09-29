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
import CreateGroup from '../group/CreateGroup';
import GroupForm from '../group/GroupForm';
import Welcome from '../Welcome';
import { FormGroup } from '@mui/material';
import CreateApplication from './CreateApplication';
import AppForm from './AppForm';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';


 
const ApplicationManagement = () => {
    
    const [username, setUsername] = useState('');
    const [appp, setAppp] = useState([]);
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [groupList, setGroupList] = useState([]);
    const [submit, setSubmit] = useState(false)
    const navigate = useNavigate();
    const axiosJWT = axios.create();

 
    useEffect(() => {
      console.log("Refresh token")
        refreshToken();
        // getGroup()
    }, []);

    useEffect(() => {
        getApp()
        setSubmit(false)
        getGroup()
    }, [submit]);

    const getApp = async () => {
      console.log("get App")
      const response = await axiosJWT.get('http://localhost:5000/App', {
      
          headers: {
              Authorization: `Bearer ${token}`
          }
      // const response = await axios.get('http://localhost:5000/viewGroup', {
        
      });
      console.log(response)
      console.log(response.data)
      console.log(response.data[0])
      // console.log(response.data);
      setAppp(response.data)
      console.log(appp)
      // console.log(grouplist2)
  }

  const checkGroup = (group_name,userGroup) => {
    if(group_name.includes(userGroup)) {
      return true
    } else {
      return false
    }
  }


    const getGroup = async () => {
        const response = await axiosJWT.get('http://localhost:5000/viewGroup', {
        
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response)
        console.log(response.data)
        setGroupList(response.data)
        console.log(groupList)
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
              sessionStorage.clear();
                navigate("/");
            }
        }
    }
 
 
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            // console.log("Token interceptor 222222")
            // console.log("response.data.accessToken")
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            // console.log("Token interceptor")
            // console.log(token)
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
        <Typography variant="h2" align="center">List of Application</Typography>
        <Typography align="center">
          {/* {sessionStorage.getItem("Group_name").includes("Project_Lead") ? */}
          {checkGroup(sessionStorage.getItem("Group_name"),"Project_Lead")  ?
          <CreateApplication setSubmit={setSubmit} groupList={groupList}/>
          : ""
        }
        {/* </Link> */}
        </Typography>
        <TableContainer component={Paper}>
      <Table sx={{ width: 300, margin:'auto'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="right">Application</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">View Application Detail</TableCell>
            <TableCell align="right">Go to Application</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appp.map((appp, index) => (
            <AppForm key= {appp.app_acronym} groupList={groupList} app={appp} app_acronym={appp.app_acronym} start={appp.app_startdate} end={appp.app_enddate}token={token} index={index}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    </div>
        </>
    )
}
 
export default ApplicationManagement


