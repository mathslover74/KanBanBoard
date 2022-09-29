/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import validator from 'validator'


 
const EditForm = (props) => {

  const [email, setEmail] = useState(props.email)
  const [password, setPassword] = useState()
  const [status, setStatus] = useState(props.status)
  const [userGroup, setUserGroup] = useState(props.userGroup)
  const [displayGroupName, setDisplayGroupName] = useState(props.userGroup)
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [err, setErr] = useState(false)
  const [errMsg, setMsgErr] = useState()
  const navigate = useNavigate();
  const axiosJWT = axios.create();
  


  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

    useEffect(() => {
      refreshToken();
      // getOneUser()
    }, []);
    
    useEffect(() => {
      props.setSubmit(false)
  }, []);

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

  const handleOnChange = (e) =>{
    if (e.target.name === 'password'){
      setPassword(e.target.value);
    }else{
      setEmail(e.target.value);
    }
  }

  const handleParams = (e,value) =>{
    console.log("**********************************")
    console.log(value.length > 0)
    if(value.length > 0 ) {
      console.log("reach")
      let string = ""
      if (value.length) {
        string = value[0].group_name;
      }
      console.log(value[0].group_name)
      console.log(value.length)
      for (let i = 1; i<value.length; i++) {
        console.log(value[i].group_name)
        string += `,${value[i].group_name}`
      }
      string = "[" + string + "]"
      console.log(string)
      setUserGroup(string)
    } else {
      setUserGroup("")
    }
  }

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    if(userGroup) {
      let allGroupName = [];
      let allGroupNameObj  = (props.groupList);
      let displayGroupNameArr = [];
      
      let usergroupArr = userGroup
      usergroupArr = usergroupArr.slice(1)
      usergroupArr = usergroupArr.slice(0,-1)
      usergroupArr = usergroupArr.split(",")
      // console.log(usergroupArr)
      // console.log(usergroupArr[0])
      // console.log(usergroupArr.length)

      for (let i = 0; i < allGroupNameObj.length; i++) {
        allGroupName.push(allGroupNameObj[i].group_name)
        for (let j = 0; j < usergroupArr.length; j++) {
          // console.log(usergroupArr[j])
          if (allGroupNameObj[i].group_name === usergroupArr[j]) {
            // console.log(`Match ${allGroupNameObj[i].group_name} and ${usergroupArr[j]} `)
            // displayGroupNameArr.push(`props.groupList[${i}]`)
            displayGroupNameArr.push(i)
          }
        }
      }
      console.log(allGroupName)
      console.log(usergroupArr)
      console.log(usergroupArr.length)
      // console.log(props.groupList[0].group_name)
      console.log(displayGroupNameArr)
      console.log(typeof displayGroupNameArr)
      // displayGroupNameArr = displayGroupNameArr.toString()
      // displayGroupNameArr = displayGroupNameArr.replace("'","")
      setDisplayGroupName(displayGroupNameArr)
      // setDisplayGroupName(props.groupList[0],props.groupList[0])
      console.log(displayGroupNameArr)
      console.log(typeof displayGroupNameArr)
      console.log(displayGroupName)
      console.log(typeof displayGroupName)
    }
    setOpen(true);
  };

  const getDefaultValue = () => {
    if(displayGroupName) {
      return displayGroupName.map((group, index) => (props.groupList[group]))
    }else {
      return []
    }
  }

  const handleClose = () => {
    setOpen(false);
    setUserGroup(props.userGroup)
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
    console.log(`http://localhost:5000/editUser/${props.username}`)
    console.log(password)
    console.log(email)
    console.log(status)
    console.log(userGroup)
    setErr(false)
    setMsgErr("")
    const useername = /^\S*$/; 
    if(!useername.test(username)){
      setErr(true)
      setMsgErr("Username cannot contain spaces")
    } else if(password) {
      console.log("Got password")
      if(password.length > 10) {
        setErr(true)
        setMsgErr("Password should be 8 to 10 char Comprise of Upper case alphabets , numbers, and special character")
      } else if (!isValidPW(password)) {
        setErr(true)
        setMsgErr("Password should be 8 to 10 char Comprise of Upper case alphabets , numbers, and special character")
       } else if (!isValidEmail(email)) {
        setErr(true)
        setMsgErr("Email Invalid")
       } else {
         try {
           const response = await axiosJWT.post(`http://localhost:5000/editUser/${props.username}`,
           {
             password: password,
             email: email,
             status: status,
             group_name: `'${userGroup}'`
           },
           {
             headers: {
               Authorization: `Bearer ${token}`
             }
           })
           if(response) {
             console.log(response)
             props.setSubmit(true)
             setDisplayGroupName(userGroup)
             setOpen(false);
           }
         } catch(e) {
          if(e.response.data.sqlMessage.includes("Duplicate")) {
            setErr(true)
            setMsgErr("Duplicate Email please try another email")
          } else {
            console.log(e)
          }
         }
       }
    } else {
      console.log("no password")
      if (!isValidEmail(email)) {
        setErr(true)
        setMsgErr("Email Invalid")
      } else {
        try {
          const response = await axiosJWT.post(`http://localhost:5000/editUser/${props.username}`,
          {
            email: email,
            status: status,
            group_name: `'${userGroup}'`
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log(response)
          props.setSubmit(true)
          setDisplayGroupName(userGroup)
          setOpen(false);
        } catch(e) {
          if(e.response.data.sqlMessage.includes("Duplicate")) {
            setErr(true)
            setMsgErr("Duplicate Email please try another email")
          } else {
            console.log(e)
          }
        }
      }
    }
    // props.setSubmit(true)
    // setOpen(false);
  }

  const antSwitch = () => {
    setStatus(!status);
  };

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));
  
    return (
        <>
  
            <TableRow
              key={props.user}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {props.index + 1}
              </TableCell>
              <TableCell align="right">{props.username}</TableCell>
              <TableCell align="right">{props.email}</TableCell>
              <TableCell align="right">{(props.userGroup) ? props.userGroup : "null"}</TableCell>
              <TableCell align="right">{props.status}</TableCell>
              <TableCell align="right">
                {/* <a>Hello</a> */}
              <Button variant="outlined" onClick={handleClickOpen}>
                Edit
                </Button>
              </TableCell>
            </TableRow>

            <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Form</DialogTitle>
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
              margin="normal"
              type="password"
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
            <Autocomplete
            // defaultValue={}
            // defaultValue = {[grouplist2[1]]}
            // defaultValue: [top100Films[1]]
            multiple
            id="checkboxes-tags-demo"
            // defaultValue = {grouplist2[0]}
            // defaultValue = {displayGroupName}
            // defaultValue = {[props.groupList[0]]}
            defaultValue = {getDefaultValue}
            // defaultValue = {["QA","GG"]}
            // defaultValue = {}
            // defaultValue = {displayGroupName}
            // displayGroupName
            options={props.groupList}
            // options={grouplist2}
            disableCloseOnSelect
            getOptionLabel={(option) => option.group_name}
            renderOption={(props, option, { selected }) => (
            <li {...props} key = {option.id}>
            <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            />
            {option.group_name}
             </li>
             )}
            style={{ width: 500 }}
            // onChange ={(event, value) => console.log(value)}
            onChange ={handleParams}
            renderInput={(params) => (
              <TextField {...params}  label="Checkboxes" placeholder="Favorites" />
            )}


            // options={grouplist}
            // disableCloseOnSelect
            // getOptionLabel={(option) => option.group_name}
            // renderOption={(props, option, { selected }) => (
            //   <li {...props}>
            //     <Checkbox
            //       icon={icon}
            //       checkedIcon={checkedIcon}
            //       style={{ marginRight: 8 }}
            //       checked={selected}
            //     />
            //     {option.group_name}
            //   </li>
            // )}
            // style={{ width: 500 }}
            // renderInput={(params) => (
            //   <TextField {...params} label="Group allGroupNameObj" placeholder="Group name" />
            // )}
            />
            
            <Typography>Account status</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Disable</Typography>
        {(status === 1) ? 
        <AntSwitch 
        checked={status} onChange={antSwitch} inputProps={{ 'aria-label': 'ant design' }} />:
        <AntSwitch 
        checked={status} onChange={antSwitch} inputProps={{ 'aria-label': 'ant design' }} />}
        <Typography>Enable</Typography>
      </Stack>
      {err ? <h3 style={{color:'red'}}>{errMsg}</h3> : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
        </>
    )
}
export default EditForm


