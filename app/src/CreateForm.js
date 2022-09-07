/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import validator from 'validator'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';


 
const CreateForm = (props) => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [username, setUsername] = useState()
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [err, setErr] = useState(false)
  const [errMsg, setMsgErr] = useState()
  const [successMsg, setSuccessMsg] = useState(false)
  const navigate = useNavigate();
  const axiosJWT = axios.create();

  const handleOnChange = (e) =>{
    if (e.target.name === 'password'){
      setPassword(e.target.value);
    }else if(e.target.name === 'email'){
      setEmail(e.target.value);
    } else {
      setUsername(e.target.value);
    }
  }

axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get('http://localhost:5000/token');
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        console.log("Token interceptor 222222")
        console.log("response.data.accessToken")
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        console.log("Token interceptor")
        console.log(token)
        setUsername(decoded.username);
        setExpire(decoded.exp);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setErr(false)
    setSuccessMsg(false)
  };

  const handleClose = () => {
    setOpen(false);
    setUsername("")
    setPassword("")
    setEmail("")
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const isValidPW = (pw) => {
    if (validator.isStrongPassword(pw, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      return true
    } else {
      return false
    }
  }
  
  const onSubmit = async(e) => {
    setUsername("")
    setPassword("")
    setEmail("")
    setSuccessMsg(false)
    console.log("submit")
    console.log(username)
    console.log(password)
    console.log(email)
    console.log(isValidPW(password))
    console.log(password.length)
    if(username && password && email) { 
      if(password.length > 10) {
        setErr(true)
        setMsgErr("Password should be 8 to 10 char Comprise of Upper case alphabets , numbers, and special character")
      }  else if (!isValidPW(password)) {
        console.log("reach")
        setErr(true)
        setMsgErr("Password should be 8 to 10 char Comprise of Upper case alphabets , numbers, and special character")
      } else if (!isValidEmail(email)) {
        setErr(true)
        setMsgErr("Email Invalid")
      } else { 
        try {
          const response = await axiosJWT.post("http://localhost:5000/createUser" ,
          {
            // username: "Admin45551",
            // password: "45552"
            username: username,
            password: password,
            email: email,
            status: 1
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
          }
          })
          console.log(response)
          // console.log(response.data.message)
          if(response.status===200){
            setErr(false)
            setSuccessMsg(true)
            setUsername("")
            setPassword("")
            setEmail("")
            props.setSubmit(true)
          }
        } catch(e) {
          console.log(e)
          console.log(e.response.data.message)
          console.log(e.request.response)
          // if(response.statyu)
          if (e.response.data.message.includes("Duplicate")) {
            if(e.response.data.message.includes("username")) {
              console.log("Reach")
              setErr(true)
              setMsgErr("Duplicate username please use a valid username")
            } else {
              setErr(true)
              setMsgErr("Duplicate email please use a valid email")
            }
          } else {
            console.log(e)
            setErr(true)
            setMsgErr("Error create Account")
          }
        }
      }
    }else {
      setErr(true)
      setMsgErr("All Field required to fill up")
      // console.log("all field required")
    }

    // if(password.length > 10) {
    //   setErr(true)
    //   setMsgErr("Password should be 8 to 10 char Comprise of alphabets , numbers, and special character")
    // }  else if (!isValidPW(password)) {
    //   setErr(true)
    //   setMsgErr("Password should be 8 to 10 char Comprise of alphabets , numbers, and special character")
    // } else if (!isValidEmail(email)) {
    //   setErr(true)
    //   setMsgErr("Email Invalid")
    // } else {
    //   if(username && password && email) {
    //     console.log("submit")
    //     try {
    //       const response = await axios.post("http://localhost:5000/createUser" ,
    //       {
    //         // username: "Admin45551",
    //         // password: "45552"
    //         username: username,
    //         password: password,
    //         email: email,
    //         status: 1
    //       })
    //       console.log(response)
    //       // console.log(response.data.message)
    //       if(response.status===200){
    //         setErr(false)
    //         setSuccessMsg(true)
    //         props.setSubmit(true)
    //       }
    //     } catch(e) {
    //       console.log(e)
    //       console.log(e.response.data.message)
    //       console.log(e.request.response)
    //       // if(response.statyu)
    //       if (e.response.data.message.includes("Duplicate")) {
    //         if(e.response.data.message.includes("username")) {
    //           console.log("Reach")
    //           setErr(true)
    //           setMsgErr("Duplicate username please use a valid username")
    //         } else {
    //           setErr(true)
    //           setMsgErr("Duplicate email please use a valid email")
    //         }
    //       } else {
    //         setMsgErr("Error create Account")
    //       }
    //     }
    //   } else {
    //     setErr(true)
    //     setMsgErr("All Field required to fill up")
    //     // console.log("all field required")
    //   }
    // }

  
  }
  
    return (
        <>
        <Button variant='contained' color='primary' onClick={handleClickOpen} >Create New User</Button>

            <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New user</DialogTitle>
        <DialogContent>
          <DialogContentText>
           All field required to fill up
          </DialogContentText>
           <TextField
              autoFocus
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="Username"
              value={username}
              onChange ={handleOnChange}
            />
            <TextField
              margin="normal"
              type="password"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              value={password}
              onChange ={handleOnChange}
            />
            <TextField
              margin="normal"
              type="email"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange ={handleOnChange}
            />
        {err ? <h3 style={{color:'red'}}>{errMsg}</h3> : null}
        {successMsg ? <h3 style={{color:'green'}}>Account Created</h3> : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
        </>
    )
}
export default CreateForm


