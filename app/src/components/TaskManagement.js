/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Welcome from './Welcome';
import Typography from '@mui/material/Typography';
 
const TaskManagement = () => {
    const [username, setusername] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
 
    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);
 
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            console.log("refresh token")
            console.log(decoded);
            setusername(decoded.username);
            setExpire(decoded.exp);

        } catch (error) {
            if (error.response) {
                sessionStorage.clear();
                navigate("/");
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
            setusername(decoded.username);
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
        setUsers(response.data);
    }
 
    return (
        <div className="container mt-5">
            <Welcome />
            <Typography variant="h3" align="left">TaskManagement App</Typography>
            
        </div>
    )
}
 
export default TaskManagement