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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import moment from 'moment'
 
const ViewApplication = (props) => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [groupName, setGroupName] = useState()
  const [err, setErr] = useState(false)
  const [errMsg, setMsgErr] = useState()
  const [successMsg, setSuccessMsg] = useState(false)
  const [acronym, setAcronym] = useState(props.app.app_acronym)
  const [description, setdescription] = useState(props.app.app_description)
  const [rNumber, setRNumber] = useState(props.app.app_rnumber)
  const [startDate, setStartDate] = useState(moment(props.app.app_startdate).format("YYYY-MM-DD 00:00:00"));
  const [endDate, setEndDate] = useState(moment(props.app.app_enddate).format("YYYY-MM-DD 00:00:00"));
  const [permitCreate, setPermitCreate] = useState(props.app.app_permit_create)
  const [permitOpen, setPermitOpen] = useState(props.app.app_permit_open)
  const [permitToDo, setPermitToDo] = useState(props.app.app_permit_todolist)
  const [permitDoing, setPermitDoing] = useState(props.app.app_permit_doing)
  const [permitDone, setPermitDone] = useState(props.app.app_permit_done)  
  const navigate = useNavigate();
  // setStartDate(moment(startDate).format("YYYY-MM-DD 00:00:00"))

  // console.log(props.app)
  // let startDate = moment(props.app.app_startdate).format("YYYY-MM-DD")
  // let endDate = moment(props.app.app_enddate).format("YYYY-MM-DD")

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    console.log(props.app)
    console.log(props.app.app_permit_create)
    console.log(props.app.app_permit_open)
    console.log(props.app.app_permit_todolist)
    console.log(props.app.app_permit_doing)
    console.log(props.app.app_permit_done)
    setOpen(true);
    setErr(false)
    setSuccessMsg(false)
    // setPermitCreate()
    // setPermitOpen()
    // setPermitToDo()
    // setPermitDoing()
    // setPermitDone()
  };

  const handleOnChange = (e) =>{
    setdescription(e.target.value);
  }

  
  const handleClose = () => {
    setOpen(false);
    // setGroupName("")
    // setAcronym();
    // setdescription();
    // setRNumber();
    // // setStartDate(null)
    // // setEndDate(null)
    // setPermitCreate()
    // setPermitOpen()
    // setPermitToDo()
    // setPermitDoing()
    // setPermitDone()
  };

  const handleEnter = e => {
    if(e.keyCode === 13) {
      console.log("enter")
    }
  }

  const handlePermitCreate = (e) => {
    console.log(e.target.value)
    console.log(typeof(e.target.value))
    console.log("permit todo reached")
    setPermitCreate(e.target.value)
    console.log(permitCreate)
  }

  const handlePermitOpen = (e) => {
    console.log(e.target.value)
    console.log(typeof(e.target.value))
    console.log("permit todo reached")
    setPermitOpen(e.target.value)
    console.log(permitOpen)
  }

  const handlePermitToDo = (e) => {
    console.log(e.target.value)
    console.log(typeof(e.target.value))
    console.log("permit todo reached")
    setPermitToDo(e.target.value)
    console.log(permitToDo)
  }

  const handlePermitDoing = (e) => {
    console.log(e.target.value)
    console.log(typeof(e.target.value))
    console.log("permit doing reached")
    setPermitDoing(e.target.value)
    console.log(permitDoing)
  }

  const handlePermitDone = (e) => {
    console.log(e.target.value)
    console.log(typeof(e.target.value))
    console.log("permit done reached")
    setPermitDone(e.target.value)
    console.log(permitDone)
  }

  const onSubmit = async(e) => {
    // setGroupName("")
    console.log(props.groupList)
    setSuccessMsg(false)
    setMsgErr("")
    console.log(acronym)
    console.log(description)
    console.log(rNumber)
    console.log(startDate)
    console.log(endDate)
    console.log(permitCreate)
    console.log(permitOpen)
    console.log(permitToDo)
    console.log(permitDoing)
    console.log(permitDone)
    // setAcronym(acronym.trim())
    // setdescription(description.trim())
    console.log(startDate)
    console.log(endDate)
    console.log(startDate < endDate)
    console.log(moment(startDate).format())
    console.log(Date())
    
    
    const onlySpace=(str) => {
      return str.trim().length === 0;
    }
    
    if(acronym && description && startDate && endDate && permitCreate &&  permitOpen && permitToDo && permitDoing && permitDone) {
      // console.log(onlySpace(acronym))
      // console.log(onlySpace(description))
      setStartDate(moment(startDate).format("YYYY-MM-DD 00:00:00"))
      setEndDate(moment(endDate).format("YYYY-MM-DD 00:00:00"))
      // setEndDate(moment(endDate).format());
      console.log(startDate)
      console.log(endDate)
      if(onlySpace(acronym)) {
        console.log("check acronym")
        setAcronym("")
        setErr(true)
        setMsgErr("Please fill in all field")
      } else if (onlySpace(description)) {
        console.log("check description")
        setdescription("")
        setErr(true)
        setMsgErr("Please fill in all field")
      } else if (startDate > endDate) {
        console.log(startDate)
        console.log(endDate)
        setErr(true)
        setMsgErr("Start date cannot be later than End date")
      }
      else {
        console.log("all filled")
        setAcronym(acronym.trim())
        setdescription(description.trim())
        try {
        const response = await axiosJWT.post('http://localhost:5000/UpdateApp', 
          {
            app_acronym: acronym,
            app_description: description,
            app_startdate: startDate,
            app_enddate: endDate,
            app_permit_create: permitCreate,
            app_permit_open: permitOpen,
            app_permit_todolist: permitToDo,
            app_permit_doing: permitDoing,
            app_permit_done: permitDone
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(response)
          console.log(startDate)
          console.log(endDate)
          if(response.status === 200) {
            // e.preventDefault()
            setErr(false)
            setSuccessMsg(true)
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
      // console.log("all filled")
    } else {
      console.log("Please fill in all field")
      setErr(true)
      setMsgErr("Please fill in all field") 
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

  
    return (
        <>
        <Button variant='contained' color='primary' onClick={handleClickOpen} >View Application</Button>

        <Dialog open={open} onClose={handleClose}  fullWidth maxWidth="xl">
        <DialogTitle>View Application</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {/* {props.app.app_acronym} */}
          </DialogContentText>
          <Typography variant="h5" component="h2" style={{marginBottom:"15px"}}>{acronym}, Running Number : {rNumber}</Typography>
   
            <TextField
              id="outlined-multiline-static"
              label="Description"
              name="Description"
              InputProps={{ sx: { height: 205 } }}
              required
              fullWidth
              multiline
              value={description || ""}
              onChange ={handleOnChange}
              rows={8}
              // defaultValue=""
              variant="outlined"
            />

            <TextField
              id="contact phone number"
              label="RunningNumbers"
              name="RunningNumbers"
              type="number"
              InputProps={{
                readOnly: true,
              }}
              defaultValue={rNumber}
              placeholder="Whole Number Only"
              fullWidth
              margin="normal"
              style={{marginBottom:"20px"}}
            />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={4} style={{marginBottom:"15px"}}>
              <Grid item xs md>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  // inputFormat="dd-MM-yyyy"
                  InputProps={{ sx: { width: 672 } }}
                  onChange={(newValue) => {
                    console.log(newValue.format("YYYY-MM-DD"));
                    setStartDate(`${newValue.format("YYYY-MM-DD")} 00:00:00`);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs md>
            <DatePicker
              margin="right"
              // inputFormat="dd-MM-yyyy"
              label="End Date"
              value={endDate}
              InputProps={{ sx: { width: 672 } }}
              minDate={new Date(startDate)}
              onChange={(newValue) => {
                setEndDate(`${newValue.format("YYYY-MM-DD")} 00:00:00`);
              }}
              renderInput={(params) => <TextField 
                {...params}
                 />}
            />
              </Grid>
            </Grid>
              </LocalizationProvider>

              <Grid container spacing={2} style={{marginBottom:"15px"}}>

              <Grid item xs md>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Permit Create</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={permitCreate}
                    // onChange={(event, value) => setPermitCreate(`${value.group_name}`)}
                    label="Permit Create"
                    onChange={handlePermitCreate}
                  > 
                    {props.groupList.map((a) => (
                    <MenuItem key={a.group_name} value={a.group_name}>
                      {a.group_name}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </Box>
              </Grid>

              <Grid item xs md>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Permit Open</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={permitOpen || ''}
                    label="Permit Open"
                    onChange={handlePermitOpen}
                  > 

                    {props.groupList.map((a) => (
                    <MenuItem key={a.group_name} value={a.group_name}>
                      {a.group_name}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </Box>

              </Grid>


              <Grid item xs md>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Permit To-Do-List</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={permitToDo || ''}
                    // onChange={(event, value) => setPermitToDo(`${value.group_name}`)}
                    onChange={handlePermitToDo}
                    label="Permit To-Do-List"
                    // onChange={handleChange}
                  > 
                    {props.groupList.map((a) => (
                    <MenuItem key={a.group_name} value={a.group_name}>
                      {a.group_name}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </Box>
              </Grid>


              <Grid item xs md>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Permit Doing</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={permitDoing || ''}
                    // onChange={(event, value) => setPermitDoing(`${value.group_name}`)}
                    onChange={handlePermitDoing}
                    label="Permit Doing"
                  > 
                    {props.groupList.map((a) => (
                    <MenuItem key={a.group_name} value={a.group_name}>
                      {a.group_name}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </Box>


           
              </Grid>
              <Grid item xs md>

              <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Permit Done</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={permitDone || ''}
                    // onChange={(event, value) => setPermitDone(`${value.group_name}`)}
                    label="Permit Done"
                    onChange={handlePermitDone}
                  > 
                    {props.groupList.map((a) => (
                    <MenuItem key={a.group_name} value={a.group_name}>
                      {a.group_name}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </Box>

              </Grid>
              </Grid>
                  {err ? <h3 style={{color:'red'}}>{errMsg}</h3> : null}
                  {successMsg ? <h3 style={{color:'green'}}>Application Updated</h3> : null}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button type="submit" onClick={onSubmit} onKeyUp={handleEnter}>Update Changes</Button>
                  </DialogActions>
                </Dialog>
        </>
    )
}
export default ViewApplication


