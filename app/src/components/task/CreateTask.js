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

const CreateTask = (props) => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [plan, setPlan] = useState()
  const [err, setErr] = useState(false)
  const [errMsg, setMsgErr] = useState()
  const [successMsg, setSuccessMsg] = useState(false)
  const [taskName, setTaskName] = useState()
  const [taskDescription, setTaskDescription] = useState()
  const [taskNotes, setTaskNotes] = useState("")
  const [arrTaskNotes, setArrTaskNotes] = useState([])
  const [rNumber, setRNumber] = useState()
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('')

  const options = ['Option 1', 'Option 2'];

  const navigate = useNavigate();
  const { id } = useParams()

  const handleOnChange = (e) =>{
    if(e.target.name === "Task_Name") {
      setTaskName(e.target.value)
    } else if (e.target.name === "Task_Description") {
      setTaskDescription(e.target.value)
    } else{
      setTaskNotes(e.target.value)
    }
      // setPlanName(e.target.value);
  }

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setErr(false)
    setSuccessMsg(false)
  };

  const handleParams = (e) =>{
    console.log(e.target.value)
    setPlan(e.target.value)
  }

  
  const handleClose = () => {
    setOpen(false);
    setTaskName()
    setTaskDescription()
    setTaskNotes("")
    setPlan()
    
    // setGroupName("")
  };

  const handleEnter = e => {
    if(e.keyCode === 13) {
      console.log("enter")
    }
  }

  const addLog = async (username,state,taskname) => {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    try {
      const response = await axiosJWT.post('http://localhost:5000/createAudit', 
        {
          login_userid: username,
          current_state: state,
          time_stamp: moment(Date.now()).format("YYYY-MM-DD, HH:mm:ss"),
          task_name: taskname,
          note: `${moment(Date.now()).format("YYYY-MM-DD, HH:mm:ss")}: ${username} - Task Created`
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response)
        if(response.status === 200) {
          console.log("Audit log created success")
        } else {
          console.log(response.data.message)
        }
    } catch(e) {
      console.log(e)
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

  const onSubmit = async(e) => {
    // setGroupName("")
    setSuccessMsg(false)
    setMsgErr("")
    // console.log(props.taskNum+1)
    let Task_id = (`${props.appInfo.app_acronym}_${props.appInfo.app_rnumber+ props.taskNum+1}`)
    console.log(taskName)
    console.log(taskDescription)
    console.log(taskNotes)
    console.log(`${props.appInfo.app_acronym}_${props.appInfo.app_rnumber+5})`)
    console.log(Task_id)
    console.log(plan)
    console.log(id)
    console.log(sessionStorage.getItem("username"))
    console.log(props.appInfo.app_permit_create)
    console.log("Task_owner")
    console.log(Date.now())
    console.log(moment(Date.now()).format("YYYY-MM-DD, HH:mm:ss"))
    console.log(`${moment(Date.now()).format("YYYY-MM-DD, HH:mm:ss")}: ${sessionStorage.getItem("username")} - Task Created`)
    let createNote = `${moment(Date.now()).format("YYYY-MM-DD - HH:mm:ss")}: ${sessionStorage.getItem("username")} - Task Created`
    let note2 = `${moment(Date.now()).format("YYYY-MM-DD - HH:mm:ss")}: ${sessionStorage.getItem("username")} - ${taskNotes}`
    console.log(createNote)
    console.log(note2)
    // setArrTaskNotes(current => [...current, createNote, note2])
    // console.log(arrTaskNotes)
    console.log(`[${createNote},${note2}]`)
    let string = ""
    console.log(taskNotes)
    if(taskNotes === "undefined") {
       console.log("no notes")
       string = createNote
       console.log(taskNotes)
    } else if (onlySpace(taskNotes)){
      console.log(onlySpace(taskNotes))
      string = createNote
      console.log("no notes")
       console.log(taskNotes)
    }else {
      console.log("got note")
      string = `${createNote},${note2}`
    }

    if(taskName && taskDescription) {
      if(onlySpace(taskName)) {
        setErr(true)
        setMsgErr("Please fill in all field")
      } else if(onlySpace(taskDescription)) {
        setErr(true)
        setMsgErr("Please fill in all field")
      } else {
        console.log("all filled")
        try {
          const response = await axiosJWT.post('http://localhost:5000/createTask', 
            {
              task_name: taskName,
              task_description: taskDescription,
              task_notes: string,
              task_id: `${Task_id}`,
              task_plan: plan,
              task_app_acronym: id,
              task_creator: sessionStorage.getItem("username"),
              task_owner: props.appInfo.app_permit_create,
              task_createdate: moment(Date.now()).format("YYYY-MM-DD, HH:mm:ss")
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
                addLog(sessionStorage.getItem("username"),"open",taskName)
                // setGroupName("") 
                setTaskName("")
                setTaskDescription("")
                setTaskNotes("")
                setPlan("")
                console.log(plan)
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
      setMsgErr("Please fill in all field")
    }
  }

  // const top100Films = [
  //   { label: 'The Shawshank Redemption', year: 1994 },
  //   { label: 'The Godfather', year: 1972 },
  //   { label: 'The Godfather: Part II', year: 1974 }
  // ]

  const top100Films = [
    { plan_mvp_name: 'The Shawshank Redemption', year: 1994 },
    { plan_mvp_name: 'The Godfather', year: 1972 },
    { plan_mvp_name: 'The Godfather: Part II', year: 1974 }
  ]

  const countries = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    {
      code: 'AE',
      label: 'United Arab Emirates',
      phone: '971',
    },
    { code: 'AF', label: 'Afghanistan', phone: '93' } ]

  
    return (
        <>
        <Button variant='contained' color='primary' onClick={handleClickOpen} >Create New Task</Button>

        <Dialog open={open} onClose={handleClose}  fullWidth maxWidth="xl">
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Field with * required to fill up
          </DialogContentText>
           <TextField
              autoFocus
              margin="normal"
              required
              fullWidth
              id="Task_Name"
              label="Task_Name"
              name="Task_Name"
              value={taskName || ""}
              onChange ={handleOnChange}
              style={{marginBottom:"15px"}}
            />
            <TextField
              id="outlined-multiline-static"
              label="Task_Description"
              name="Task_Description"
              InputProps={{ sx: { height: 205 } }}
              required
              fullWidth
              multiline
              value={taskDescription || ""}
              onChange ={handleOnChange}
              rows={8}
              defaultValue=""
              variant="outlined"
              style={{marginBottom:"15px"}}
            />
            <TextField
              id="outlined-multiline-static"
              label="Task_Notes"
              name="Task_Notes"
              InputProps={{ sx: { height: 205 } }}
              // required
              fullWidth
              multiline
              value={taskNotes || ""}
              onChange ={handleOnChange}
              rows={8}
              defaultValue=""
              variant="outlined"
              style={{marginBottom:"15px"}}
            />
            <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Plan</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={plan || ""}
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

            
            {/* <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            // defaultValue = {plan}
            value = {plan || ""}
            options={props.plan}
            autoHighlight
            getOptionLabel={(option) => option.plan_mvp_name}
            // renderOption={(props, option) => (
            //   <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            //     {option.plan_mvp_name}
            //   </Box>
            // )}
            renderOption={(props, options) => {
              const {plan_mvp_name,plan_color} = options;
              return (
                <Box style={{ backgroundColor: plan_color }} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                {plan_mvp_name}
              </Box>
              );
            }}

            
            onChange ={handleParams}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Plan"
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
          /> */}

            {/* <Autocomplete
                value={value}
                style={{marginBottom:"15px"}}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={props.plan}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Task_Plan" />}
              /> */}

                  {err ? <h3 style={{color:'red'}}>{errMsg}</h3> : null}
                  {successMsg ? <h3 style={{color:'green'}}>New Task Created</h3> : null}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={onSubmit} onKeyUp={handleEnter}>Create</Button>
                  </DialogActions>
                </Dialog>
        </>
    )
}
export default CreateTask


