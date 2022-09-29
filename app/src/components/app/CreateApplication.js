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
 
const CreateApplication = (props) => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [groupName, setGroupName] = useState()
  const [err, setErr] = useState(false)
  const [errMsg, setMsgErr] = useState()
  const [successMsg, setSuccessMsg] = useState(false)
  const [acronym, setAcronym] = useState()
  const [description, setdescription] = useState()
  const [rNumber, setRNumber] = useState()
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [permitCreate, setPermitCreate] = useState('')
  const [permitOpen, setPermitOpen] = useState('')
  const [permitToDo, setPermitToDo] = useState('')
  const [permitDoing, setPermitDoing] = useState('')
  const [permitDone, setPermitDone] = useState('')  
  const navigate = useNavigate();

  const countries = [
    { name: 'admin' },
    {
      name: 'user',
    },
    { name: 'PL'},
    {
      name: 'TM',

    }]

  const handleOnChange = (e) =>{
    if (e.target.name === 'App_acronym'){
      setAcronym(e.target.value);
    }else if(e.target.name === 'Description'){
      setdescription(e.target.value);
    } else {
      let value = e.target.value.replace(/\D/g, "");
      setRNumber(value);
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

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setErr(false)
    setSuccessMsg(false)
    setPermitCreate()
    setPermitOpen()
    setPermitToDo()
    setPermitDoing()
    setPermitDone()
  };

  
  const handleClose = () => {
    setOpen(false);
    setGroupName("")
    setAcronym();
    setdescription();
    setRNumber();
    setStartDate(null)
    setEndDate(null)
    setPermitCreate()
    setPermitOpen()
    setPermitToDo()
    setPermitDoing()
    setPermitDone()
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

const useername = /^\S*$/; 

const onlySpace=(str) => {
  return str.trim().length === 0;
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

    if(acronym && description && rNumber && startDate && endDate && permitCreate &&  permitOpen && permitToDo && permitDoing && permitDone) {
      // console.log(onlySpace(acronym))
      // console.log(onlySpace(description))
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
        const response = await axiosJWT.post('http://localhost:5000/App', 
          {
            app_acronym: acronym,
            app_description: description,
            app_rnumber: rNumber,
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
          if(response.status === 200) {
            // e.preventDefault()
            setErr(false)
            setSuccessMsg(true)
            props.setSubmit(true)
            console.log("$$$$$$$$$$$$$$$$$")
            console.log(typeof(permitToDo))
            setGroupName("")
            setAcronym("");
            setdescription("");
            setRNumber("");
            setStartDate(null)
            setEndDate(null)
            setPermitCreate("")
            setPermitOpen("")
            setPermitToDo("")
            setPermitDoing("")
            setPermitDone("")
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
            console.log(permitToDo)
            console.log( permitOpen)
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

    


    // const grouppname = /^\S*$/; 
    // if(!grouppname.test(groupName)) {
    //   setErr(true)
    //   setMsgErr("Username cannot contain spaces")
    // } else if(groupName) {
    //   console.log(true)
    //   try {
    //     // const response = await axios.post('http://localhost:5000/createGroup', 
    //     const response = await axiosJWT.post('http://localhost:5000/createGroup', 
    //     {
    //       group_Name: groupName
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     }
    //     // // const response = await axiosJWT.post('http://localhost:5000/createGroup', 
    //     // input,
    //     // axiosConfig
    //     );
    //     // const response = await axios.post("http://localhost:5000/createGroup" , 
    //     // {
    //     //     group_Name: groupName,
    //     //   },
          
    //       console.log(response)
    //       if(response.status === 200) {
    //         setErr(false)
    //         setSuccessMsg(true)
    //         setGroupName("")
    //         props.setSubmit(true)
    //       } else {
    //         console.log(response.data.message)
    //         setErr(true)
    //         setMsgErr("ERROR")
    //       }
    //   } catch(e) {
    //     console.log(e)
    //     console.log(e.response.data.message.includes("Duplicate"))
    //     if(e.response.data.message.includes("Duplicate")) {
    //       setErr(true)
    //       setMsgErr(e.response.data.message)
    //     } else {
    //       setErr(true)
    //       setMsgErr(e.response.data)
    //     }
    //   }
    // } else {
    //   console.log(false)
    //   setErr(true)
    //   setMsgErr("All Field required to fill up")
    // }
  }
  
    return (
        <>
        <Button variant='contained' color='primary' onClick={handleClickOpen} >Create New Application</Button>

        <Dialog open={open} onClose={handleClose}  fullWidth maxWidth="xl">
        <DialogTitle>Create New Application</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Field with * required to fill up
          </DialogContentText>
           <TextField
              autoFocus
              margin="normal"
              required
              fullWidth
              id="App_acronym"
              label="App_acronym"
              name="App_acronym"
              value={acronym || ""}
              onChange ={handleOnChange}
              style={{marginBottom:"15px"}}
            />
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
              value={rNumber || ""}
              onChange ={handleOnChange}
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
                    value={permitCreate || ''}
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

              {/* <Autocomplete
              id="country-select-demo"
              sx={{ width: "auto" }}
              options={props.groupList}
              autoHighlight
              // value={permitCreate}
              getOptionLabel={(option) => option.group_name}
              // onChange= {handleCreate}
              onChange={(event, value) => setPermitCreate(`${value.group_name}`)}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.group_name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Permit Create"
                  defaultValue={permitCreate}
                  value={permitCreate}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            /> */}
              </Grid>

              <Grid item xs md>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Permit Open</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // defaultValue = {permitOpen}
                    value={permitOpen || ''}
                    label="Permit Open"
                    // onChange={(event, value) =>  setPermitOpen(`${value.group_name}`)}
                    onChange={handlePermitOpen}
                  > 
                    {/* {props.groupList.map(element => (
                      <MenuItem
                        value={element[Object.keys(element)] + ""}
                        key={Object.keys(element)}
                      >
                        {Object.keys(element)}
                      </MenuItem>
                    ))} */}

                    {props.groupList.map((a) => (
                    <MenuItem key={a.group_name} value={a.group_name}>
                      {a.group_name}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </Box>

              {/* <Autocomplete
              id="country-select-demo"
              sx={{ width: "auto" }}
              options={props.groupList}
              // defaultValue={permitOpen}
              value={permitOpen}
              autoHighlight
              getOptionLabel={(option) => option.group_name}
              // onChange= {handleParams}
              onChange={(event, value) => setPermitOpen(value.group_name)}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.group_name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Permit Open"
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            /> */}
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

              {/* <Autocomplete
              id="country-select-demo"
              sx={{ width: "auto" }}
              options={props.groupList}
              autoHighlight
              // defaultValue={permitToDo}
              inputValue={permitToDo}
              getOptionLabel={(option) => option.group_name}
              onChange={(event, value) => setPermitToDo(value.group_name)}
              // onChange= {handleParams}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.group_name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                value={permitToDo || null}
                  {...params}
                  label="Permit To-Do-List"
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            /> */}
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


              {/* <Autocomplete
              id="country-select-demo"
              sx={{ width: "auto" }}
              options={props.groupList}
              // defaultValue={permitDoing}
              // value={permitDoing}
              autoHighlight
              getOptionLabel={(option) => option.group_name}
              // onChange= {handleParams}
              onChange={(event, value) => setPermitDoing(value.group_name)}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.group_name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Permit Doing"
                  inputProps={{
                    ...params.inputProps,
                  }}
                  value={permitDoing}
                defaultValue={permitDoing}
                />
              )}
            /> */}
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


              {/* <Autocomplete
              id="country-select-demo"
              sx={{ width: "auto" }}
              options={props.groupList}
              autoHighlight
              value={permitDone}
              // defaultValue={permitDone}
              getOptionLabel={(option) => option.group_name}
              // onChange= {handleParams}
              onChange={(event, value) => setPermitDone(value.group_name)}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.group_name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Permit Done"
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            /> */}
              </Grid>
              </Grid>
                  {err ? <h3 style={{color:'red'}}>{errMsg}</h3> : null}
                  {successMsg ? <h3 style={{color:'green'}}>New Application Created</h3> : null}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={onSubmit} onKeyUp={handleEnter}>Create</Button>
                  </DialogActions>
                </Dialog>
        </>
    )
}
export default CreateApplication

