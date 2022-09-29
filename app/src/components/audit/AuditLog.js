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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { spacing } from '@mui/system';
import Autocomplete from '@mui/material/Autocomplete';
import { useParams } from 'react-router-dom';
import moment from 'moment'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { create } from '@mui/material/styles/createTransitions';
import MenuItem from '@mui/material/MenuItem';

const AuditLog = (props) => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [err, setErr] = useState(false)
  const [errMsg, setMsgErr] = useState()
  const [successMsg, setSuccessMsg] = useState(false)
  const [auditLog, setAuditLog] = useState()
  const [auditComments, setAuditComments] = useState([])
  const [plan, setPlan] = useState(props.task.task_plan)
  // const [submit, setSubmit] = useState(false)
  // const [arrNote, setArrNote] = useState(props.task.task_notes.split(","))
  // const [string, setString] = useState()

  const options = ['Option 1', 'Option 2'];

  const navigate = useNavigate();
  const { id } = useParams()

  // console.log("******************************************************")
  // console.log(props.task.task_plan)
  // console.log(typeof(props.task.task_plan))

//   useEffect(() => {
//     // console.log(props.task_name)
//     console.log(props.task)
//     console.log(props.task.task_notes)
//     // console.log
//     // let arr = props.task.task_notes.split(",")
//     // console.log(arr.length)
//     // for (const e of arr) {
//     //   console.log(e)
//     // }
//     // let arr = props.task.task_notes.split(",")
//     // console.log(arrNote)
//     // console.log(arrNote.length)
//     setSubmit(false)
//     getAuditInfo()
// }, [submit]);

// const getAuditInfo = async () => {
//   console.log("get App ingo")
//   try {
//     const response = await axiosJWT.post('http://localhost:5000/getAuditBy/', 
//       { 
//         task_name: props.task.task_name
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       console.log(response)
//       if (response.data.message) {
//         setAuditLog([""])
//       } else if(response.status === 200) {
//         setAuditLog(response.data)
//         // let string = ""
//         // response.data.map((note,index) => (
//         //   // string = string + " <br /> " + note.note 
//         //   setString(string + '/n' + note.note)
//         // ))
//         // console.log(string)
//         console.log(auditLog)
//         // setAuditLog(response.data[0].note)
//         // setAppInfo(response.data[0])
//       } else {
//         console.log(response.data.message)
//       }
//   } catch(e) {
//     console.log(e)
//   }
// }
// const getDefaultValue = () => {
//   for (let i = 0 ; i<props.plan.length; i++) {
//     console.log(props.plan[i])
//   }

//   // if(props.) {
//   //   return displayGroupName.map((group, index) => (props.groupList[group]))
//   // }else {
//   //   return []
//   // }
// }

const checkGroup = (group_name,userGroup) => {
  if(group_name.includes(userGroup)) {
    return true
  } else {
    return false
  }
}

const handleParams = (e) =>{
  console.log(e.target.value)
  setPlan(e.target.value)
}

  const handleOnChange = (e) =>{
    if(e.target.name === "Notes Comments") {
      setAuditComments(e.target.value)
    }
      // setPlanName(e.target.value);
  }

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setErr(false)
    setSuccessMsg(false)
  };
  
  const handleClose = () => {
    setOpen(false);
    // setGroupName("")
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

const onlySpace=(str) => {
  return str.trim().length === 0;
}

  const onCommentSubmit = async(e) => {
    // setSuccessMsg(false)
    // setMsgErr("")

    console.log(props.state)
    console.log(sessionStorage.getItem('username'))
    // console.log(props.task_name)
    console.log(auditComments)
    console.log(props.task)
    console.log(props.task.task_notes)
    console.log(typeof(props.task.task_notes))
    // let string = props.task.task_notes.slice(0,-1)+','  
    console.log(props.task.task_name)
    let taskString = `${props.task.task_notes},${moment(Date.now()).format("YYYY-MM-DD - HH:mm:ss")}: ${sessionStorage.getItem("username")} - ${auditComments}` 
    // string = `${string}${moment(Date.now()).format("YYYY-MM-DD - HH:mm:ss")}: ${sessionStorage.getItem("username")} - ${auditComments}`
    console.log(taskString)
    
    // addLog(sessionStorage.getItem('username'),props.state,props.task_name,auditComments)
    if(auditComments) {
      if(onlySpace(auditComments)) {
        setErr(true)
        setMsgErr("Please fill in comment section")
      } else {
        console.log("filled")
        try {
          const response = await axiosJWT.post('http://localhost:5000/addTaskNotes', 
            {
              task_name: props.task.task_name,
              task_notes: taskString,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            console.log(response)
            if(response.status === 200) {
              setErr(false)
              setSuccessMsg(true)
              // setPlan("")
              setAuditComments("")
              props.setSubmit(true)

            } else {
              console.log(response.data.message)
                setErr(true)
                setMsgErr("ERROR")
            }
        } catch(e) {
          console.log(e)
          setErr(true)
          setMsgErr(e.response.data.message)
        }
      }
    } else {
      setErr(true)
      setMsgErr("Please fill in comment section")
    }
  }

  const onUpdatePlanSubmit = async(e) => {
   console.log("GG.com") 
   if(props.task.task_plan === plan) {
    setErr(true)
    setMsgErr("Plan is the same as previous please pick another one")
   } else {
    console.log("change")
    console.log(plan)
    try {
      const response = await axiosJWT.post('http://localhost:5000/editPlan', 
        {
          task_name: props.task.task_name,
          task_plan: plan,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response)
        if(response.status === 200) {
          setErr(false)
          setSuccessMsg(true)
          props.setSubmit(true)
        } else {
          console.log(response.data.message)
            setErr(true)
            setMsgErr("ERROR")
        }
    } catch(e) {
      console.log(e)
      setErr(true)
      setMsgErr(e.response.data.message)
    }
   }
  }
  
    return (
        <>
        <Button size="small" variant='contained' color='primary' onClick={handleClickOpen} >View Details</Button>

        <Dialog open={open} onClose={handleClose}  fullWidth maxWidth="xl">
        <DialogTitle >View Details - {props.task.task_name}</DialogTitle>
        <DialogContent>
          { checkGroup(sessionStorage.getItem("Group_name"),props.appInfo.app_permit_open) ?
        <FormControl fullWidth style ={{marginBottom: "15px" , marginTop: "10px"}}>
                  <InputLabel id="demo-simple-select-label">Plan</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value="East Coast"
                    value={plan}
                    // value={plan || ""}
                    // onChange={(event, value) => setPermitDone(`${value.group_name}`)}
                    label="Permit Done"
                    onChange={handleParams}
                  > 
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                    {props.plan.map((a) => (
                    <MenuItem key={a.plan_mvp_name} value={a.plan_mvp_name} style={{background: a.plan_color}}>
                      {a.plan_mvp_name}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
                :
                <FormControl fullWidth style ={{marginBottom: "15px" , marginTop: "10px"}}>
                  <InputLabel id="demo-simple-select-label">Plan</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value="East Coast"
                    value={plan}
                    // value={plan || ""}
                    // onChange={(event, value) => setPermitDone(`${value.group_name}`)}
                    label="Permit Done"
                    // onChange={handleParams}
                  > 
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                    {props.plan.map((a) => (
                    <MenuItem key={a.plan_mvp_name} value={a.plan_mvp_name} style={{background: a.plan_color}}>
                      {a.plan_mvp_name}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
                
          
        }

            <TextField
              id="outlined-multiline-static"
              label="Description"
              name="Description"
              style ={{marginBottom: "15px"}}
              value={props.task.task_description}
              InputProps={{ readyOnly: true }}
              // InputProps={{ sx: { height: 205 } }}
              required
              fullWidth
              multiline
              // value={description}
              // onChange ={handleOnChange}
              rows={6}
              defaultValue=""
              variant="outlined"
            />

            <TextField
              id="outlined-multiline-static"
              label="Task Notes"
              name="Task Notes"
              // InputProps={{ readyOnly: true }}
              InputProps={{ readyOnly: true, sx: { height: 170 } }}
              required
              fullWidth
              multiline
              // value={auditLog}
              value={props.task.task_notes.split(",").slice(0).reverse().map(note => note+'\n').join("")}
              // value={props.arrNote.slice(0).reverse().map(note => note+'\n').join("")}
              // value={arrNote.map(note => note+'\n').join("")}
              // value={props.task.task_notes}
              // value ={props.task.map(note => note.task_notes+'\n')}
              // value={
              //   auditLog ?
              //   auditLog.map(note=> note.note+'\n').join('') :
              //   ""
              // }
              // onChange ={handleOnChange} 
              rows={6}
              defaultValue=""
              variant="outlined"
              style={{marginBottom:"15px"}}
            />
            {props.updateB ? 
            <TextField
            id="outlined-multiline-static"
            label="Notes Comments"
            name="Notes Comments"
            InputProps={{ sx: { height: 130 } }}
            required
            fullWidth
            multiline
            value={auditComments}
            onChange ={handleOnChange}
            rows={4}
            defaultValue=""
            variant="outlined"
            style={{marginBottom:"15px"}}
          />
            :
            ""
            }
            

                  {err ? <h3 style={{color:'red'}}>{errMsg}</h3> : null}
                  {successMsg ? <h3 style={{color:'green'}}>New Note Created</h3> : null}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    {props.updateB ?
                    <Button type="submit" onClick={onCommentSubmit} onKeyUp={handleEnter}>Update Note</Button>
                    :""
                  }
                    { checkGroup(sessionStorage.getItem("Group_name"),props.appInfo.app_permit_open) ?
                    <Button type="submit" onClick={onUpdatePlanSubmit} onKeyUp={handleEnter}>Update plan</Button>
                    : ""}
                  </DialogActions>
                </Dialog>
        </>
    )
}
export default AuditLog


