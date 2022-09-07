/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import validator from 'validator'
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import jwt_decode from "jwt-decode";


 
const EditProfile = (props) => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState(props.email)
  const [password, setPassword] = useState()
  const [status, setStatus] = useState(props.status)
  const [userGroup, setUserGroup] = useState(props.userGroup)
  const [err, setErr] = useState(false)
  const [errMsg, setMsgErr] = useState()
  const [successMsg, setSuccessMsg] = useState(false)
  const navigate = useNavigate();

  const grouplist = ["Admin", "QA", "Tester"];
  const grouplist2 = [
    {group_name: "Admin"},
    {group_name: "QA"},
    {group_name: "Tester"}
  ]

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 }]

  const handleOnChange = (e) =>{
    if (e.target.name === 'password'){
      setPassword(e.target.value);
    }else{
      setEmail(e.target.value);
    }
  }

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setErr(false)
    setMsgErr("")
    setSuccessMsg("")
    setOpen(true);
  };

  const axiosJWT = axios.create();


axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get('http://localhost:5000/token');
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        console.log(token)
        console.log("Token interceptor")
        setUsername(decoded.username);
        setExpire(decoded.exp);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


  const handleClose = () => {
    setOpen(false);
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
    setSuccessMsg(false)
    console.log(`http://localhost:5000/editUser/${props.username}`)
    console.log(password)
    console.log(email)
    console.log(userGroup)
    setErr(false)
    setMsgErr("")

    if(email && password) {
      console.log("got email and password")
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
        console.log(email)
        console.log(password)
        try {
           // const response = await axios.post('http://localhost:5000/createGroup', 
        // const response = await axiosJWT.post(`http://localhost:5000/editUser/${props.username}`, 
        // {
        //   group_Name: "tester5"
        // },
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // }
          const response = await axiosJWT.post(`http://localhost:5000/editUser/${props.username}`,
          {
            password: password,
            email: email,
            status: "1",
            group_name: `'${userGroup}'`
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
          )
          if(response) {
            console.log(response)
            // setErr(false)
            // setSuccessMsg(true)
            props.setSubmit(true)
            setOpen(false);
          }
        } catch(e) {
          console.log(e)
          console.log(e.data)
          if(e.response.data.sqlMessage.includes("Duplicate")) {
            setErr(true)
            setMsgErr("Duplicate Email please try another email")
          } else {
            setErr(true)
            setMsgErr("ERROR")
          }
          console.log(e)
        }
      }
    } else {
      if(!isValidEmail(email)) {
        setErr(true)
        setMsgErr("Email Invalid")
      } else {
        console.log(email)
        try {

        //   const response = await axiosJWT.post('http://localhost:5000/createGroup', 
        // {
        //   group_Name: "tester5"
        // },
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // }
          const response = await axiosJWT.post(`http://localhost:5000/editUser/${props.username}`,
          {
            email: email,
            status: "1",
            group_name: `'${userGroup}'`
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
          )
          if(response) {
            console.log(response)
            props.setSubmit(true)
            setOpen(false);
          }
        } catch(e) {
          console.log(e)
          console.log(e.data)
          if(e.response.data.sqlMessage.includes("Duplicate")) {
            setErr(true)
            setMsgErr("Duplicate Email please try another email")
          } else {
            setErr(true)
            setMsgErr("ERROR")
          }
          console.log(e)
        }

        console.log("only email")
        props.setSubmit(true)
      }
    }
  }
  
    return (
        <>
  
            <TableRow
              key={props.user}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{props.username}</TableCell>
              <TableCell align="right">{props.email}</TableCell>
              <TableCell align="right">{props.userGroup}</TableCell>
              <TableCell align="right">
                {/* <a>Hello</a> */}
              <Button variant="outlined" onClick={handleClickOpen}>
                Edit
                </Button>
              </TableCell>
            </TableRow>

            <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Change the following and submit for changes.
           <br></br>
           <span style={{color:'red'}}>Fill in only password if Required to change</span>
          </DialogContentText>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="Username"
              value = {props.username}
            />
            <TextField
              type="password"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              // defaultValue="LOL"
              onChange ={handleOnChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              defaultValue= {props.email}
              onChange ={handleOnChange}
            />
        {err ? <h3 style={{color:'red'}}>{errMsg}</h3> : null}
        {successMsg ? <h3 style={{color:'green'}}>Account Edited</h3> : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
        </>
    )
}
export default EditProfile


