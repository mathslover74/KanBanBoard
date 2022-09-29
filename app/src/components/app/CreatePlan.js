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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
 

const CreatePlan = (props) => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [groupName, setGroupName] = useState()
  const [err, setErr] = useState(false)
  const [errMsg, setMsgErr] = useState()
  const [successMsg, setSuccessMsg] = useState(false)
  const [PlanName, setPlanName] = useState()
  const [description, setdescription] = useState()
  const [rNumber, setRNumber] = useState()
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [planColor, setPlanColor] = useState('');
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('')



  const navigate = useNavigate();
  const { id } = useParams()

  const countries = [
    { name: 'admin' },
    {
      name: 'user',
    },
    { name: 'PL'},
    {
      name: 'TM',

    }]

  const handleOnChange = (e,value) =>{
    if(e.target.name==="plan_mvp_name") {
      setPlanName(e.target.value);
    } else {
      setPlanColor(e.target.value)
    }
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
    setPlanName("")
    setStartDate(null)
    setEndDate(null)

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


  const onSubmit = async(e) => {
    // setGroupName("")
    setSuccessMsg(false)
    setMsgErr("")
    console.log(PlanName)
    console.log(startDate)
    console.log(endDate)
    console.log(id)
    console.log(planColor)

    if(PlanName && startDate && endDate) {
      if(onlySpace(PlanName)) {
        setErr(true)
        setMsgErr("Please fill in all field")
      } else if(startDate > endDate) {
        setErr(true)
        setMsgErr("Start date cannot be later than End date")
      } else {
        console.log("filled")
        try {
          const response = await axiosJWT.post('http://localhost:5000/createPlan', 
            {
              plan_mvp_name: PlanName,
              plan_startdate: startDate,
              plan_enddate: endDate,
              plan_app_acronym: id,
              plan_color: planColor
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
                setGroupName("")
                setPlanColor("")     
                setPlanName("")
                setStartDate(null)
                setEndDate(null)
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
      setMsgErr("Please fill in all field")
    }

  }

  const colorList = [
    { title: "#20639B", color: "#20639B" },
    { title: "#3CAEA3", color: "#3CAEA3" },
    { title: "#F6D55C", color: "#F6D55C" },
    { title: "#ED553B", color: "#ED553B" },
    { title: "#6F38C5", color: "#6F38C5" }
    //Plus a bunch more
  ];


  
    return (
        <>
        <Button variant='contained' color='primary' onClick={handleClickOpen} >Create New Plan</Button>

        <Dialog open={open} onClose={handleClose}  fullWidth>
        <DialogTitle>Create New Plan</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Field with * required to fill up
          </DialogContentText>
           <TextField
              autoFocus
              margin="normal"
              required
              fullWidth
              id="plan_mvp_name"
              label="Plan Name"
              name="plan_mvp_name"
              value={PlanName}
              onChange ={handleOnChange}
              style={{marginBottom:"15px"}}
            />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={4} style={{marginBottom:"15px"}}>
              <Grid item xs md>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  // inputFormat="dd-MM-yyyy"
                  // InputProps={{ sx: { width: 672 } }}
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
              // InputProps={{ sx: { width: 672 } }}
              onChange={(newValue) => {
                setEndDate(`${newValue.format("YYYY-MM-DD")} 00:00:00`);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
              </Grid>
            </Grid>
              </LocalizationProvider>

              {/* <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                sx={{ width: 300 }}
                renderOption={(props, option) => {
                  const { title, color } = option;
                  return (
                    <span {...props} style={{ backgroundColor: color }}>
                      {title}
                    </span>
                  );
                }}
                
                renderInput={(params) => <TextField {...params} label="Controllable" />}
              /> */}
              <Box sx={{ minWidth: 120 }}> 
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Color Selection</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={planColor || ''}
                    // onChange={(event, value) => setPermitDone(`${value.group_name}`)}
                    label="Permit Done"
                    onChange={handleOnChange}
                  > 
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                    {colorList.map((a) => (
                    <MenuItem key={a.title} value={a.title} style={{background: a.color}}>
                      {a.title}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </Box>
              
            

                  {err ? <h3 style={{color:'red'}}>{errMsg}</h3> : null}
                  {successMsg ? <h3 style={{color:'green'}}>New Plan Created</h3> : null}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={onSubmit} onKeyUp={handleEnter}>Create</Button>
                  </DialogActions>
                </Dialog>
        </>
    )
}
export default CreatePlan


