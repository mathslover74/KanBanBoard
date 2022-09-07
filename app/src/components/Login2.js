import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Login(props) {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [err, setErr] = useState(false)
  const [errMsg, setMsgErr] = useState()
 
  const navigate = useNavigate();
  

  const handleOnChange = (e) =>{
    if (e.target.name === 'username'){
      setUsername(e.target.value);
    }else{
      setPassword(e.target.value);
    }
  }

  useEffect(() => {
    if(sessionStorage.getItem("username")) {
      navigate("/dashboard")
    }
  }, []);

  const checkAdmin = async (e) => {
    const response = await axios.post("http://localhost:5000/checkGroup" ,
        {
          username: username,
          group_name: "Admin"
        }).then(result => {
          console.log(result)
          console.log(result.data.message)
          if(result.data.message) {
            sessionStorage.setItem("admin", true)
            console.log("admin set")
          }else {
            console.log("LOL")
          }
            console.log(sessionStorage.getItem("admin"))
        })

        // console.log(response.data.message)
        // if (response.data.message) {
        //   sessionStorage.setItem("admin", true)
        //   console.log("admin set")
        // }
        // console.log("check admin reached")
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErr(false)
    setMsgErr("")
    console.log("Hello submit")
    console.log(username)
    console.log(password)
    if ((username && password) && (username || password) ) {
      try {
        const response = await axios.post("http://localhost:5000/login" ,
        {
          // username: "Admin45551",
          // password: "45552"
          username: username,
          password: password
        })
        if(response.data.message) {
          setErr(true)
          setMsgErr(response.data.message)
        } else {
          console.log("data recieved")
          console.log(response.data)
          setErr(false);
          checkAdmin()
          sessionStorage.setItem("username", response.data.username)
          sessionStorage.setItem("Group_name", response.data.group_name)
          navigate("/usermanagement")
        }
      } catch(e) {
        console.log(e)
        console.log(e.response.data.message)
        setErr(true)
        setMsgErr(e.response.data.message)
      }
    } else {
      setErr(true)
      setMsgErr("All Field required to fill up")
      console.log("require all to be filled")
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="Username"
              autoFocus
              onChange ={handleOnChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange ={handleOnChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <h3 style={{color:'red'}}> Wrong Username or Password</h3> */}
            {err ? <h3 style={{color:'red'}}>{errMsg}</h3> : null}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}