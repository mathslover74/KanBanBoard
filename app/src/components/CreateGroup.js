/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
 
const CreateGroup = (props) => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [groupName, setGroupName] = useState()
  const [err, setErr] = useState(false)
  const [errMsg, setMsgErr] = useState()
  const [successMsg, setSuccessMsg] = useState(false)
  const navigate = useNavigate();

  const handleOnChange = (e) =>{
    setGroupName(e.target.value)
  }

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setErr(false)
    setSuccessMsg(false)
  };

  
  const handleClose = () => {
    setOpen(false);
    setGroupName("")
  };

  const handleEnter = e => {
    if(e.keyCode === 13) {
      console.log("enter")
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

  const onSubmit = async(e) => {
    console.log(props.token)
    setGroupName("")
    setSuccessMsg(false)
    setMsgErr("")
    console.log("submit")
    console.log(groupName)

    if(groupName) {
      console.log(true)
      try {
        // const response = await axios.post('http://localhost:5000/createGroup', 
        const response = await axiosJWT.post('http://localhost:5000/createGroup', 
        {
          group_Name: groupName
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        // // const response = await axiosJWT.post('http://localhost:5000/createGroup', 
        // input,
        // axiosConfig
        );
        // const response = await axios.post("http://localhost:5000/createGroup" , 
        // {
        //     group_Name: groupName,
        //   },
          
          console.log(response)
          if(response.status === 200) {
            setErr(false)
            setSuccessMsg(true)
            setGroupName("")
            props.setSubmit(true)
          } else {
            console.log(response.data.message)
            setErr(true)
            setMsgErr("ERROR")
          }
      } catch(e) {
        console.log(e)
        console.log(e.response.data.message.includes("Duplicate"))
        if(e.response.data.message.includes("Duplicate")) {
          setErr(true)
          setMsgErr(e.response.data.message)
        } else {
          setErr(true)
          setMsgErr(e.response.data)
        }
      }
    } else {
      console.log(false)
      setErr(true)
      setMsgErr("All Field required to fill up")
    }
  }
  
    return (
        <>
        <Button variant='contained' color='primary' onClick={handleClickOpen} >Create New Group</Button>

            <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New group</DialogTitle>
        <DialogContent>
          <DialogContentText>
           All field required to fill up
          </DialogContentText>
           <TextField
              autoFocus
              margin="normal"
              required
              fullWidth
              id="group_name"
              label="group_name"
              name="group_name"
              autoComplete="group_name"
              value={groupName}
              onChange ={handleOnChange}
            />
        {err ? <h3 style={{color:'red'}}>{errMsg}</h3> : null}
        {successMsg ? <h3 style={{color:'green'}}>New Group Created</h3> : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={onSubmit} onKeyUp={handleEnter}>Create</Button>
        </DialogActions>
      </Dialog>
        </>
    )
}
export default CreateGroup


