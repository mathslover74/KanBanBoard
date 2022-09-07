import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from "axios"


const theme = createTheme();


export default function Navbar2(props) {
  const navigate = useNavigate();
  console.log("NAVVVVV BARRRRRRRRRRRRRRRR")
  console.log(sessionStorage.getItem("admin"))
  console.log(sessionStorage.getItem("username") )
  
  

  const Logout = async () => {
    try {
        await axios.get("http://localhost:5000/signout")
        sessionStorage.clear();
        navigate("/");
    } catch (error) {
        console.log(error);
    }
}

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          {/* <Link href='/' color="inherit">HOME</Link> */}
          {/* {(props.loggedIn) ? <Button variant="text" color="inherit" href="/signin" onClick={signOut}>Logout</Button> :
          // <Button variant="text" color="inherit" href='/'>Login</Button>
          ""
          } */}
          {/* {((sessionStorage.getItem("loggedin") === false) || sessionStorage.getItem("loggedin") === null) 
          ?  
          <Button variant="text" color="inherit" href='/'>Login</Button> 
          :
          <Button variant="text" color="inherit" href="/" onClick={signOut}>Logout</Button>
          } */}
          {/* {(sessionStorage.getItem("admin")===false) ? <Button variant="text" color="inherit" href='#'>User Management</Button> : "" }
          {(sessionStorage.getItem("admin")===false) ? <Button variant="text" color="inherit" href='#'>Group Management</Button> : "" }  */}
          {/* {(props.admin) ? <Button variant="text" color="inherit" href='#'>User Management</Button> : "" }
          {(props.admin) ? <Button variant="text" color="inherit" href='#'>Group Management</Button> : "" } */}
          <Button variant="text" color="inherit" href='/profile'>Profile</Button>
          <Button variant="text" color="inherit" href='/dashboard'>Kan Ban</Button>
          {sessionStorage.getItem("admin") ?
          <>
          <Button variant="text" color="inherit" href='/usermanagement'>User Management</Button>
          <Button variant="text" color="inherit" href='/groupmanagement'>Group Management</Button>
          </>
          :
          ""
          }
          {/* <Button variant="text" color="inherit" href='/'>Login</Button> */}
          {sessionStorage.getItem("username") ?
          <Button variant="text" color="inherit" href="/" onClick={Logout}>Logout</Button>
          : ""
          }

          {/* <Link href='/' color="inherit">HOME</Link> */}
          {/* {(sessionStorage.getItem("loggedin")) ? <Button variant="text" color="inherit" href="/" onClick={signOut}>Logout</Button> :
          // <Button variant="text" color="inherit" href='/'>Login</Button>
          ""
          } */}
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
        </Box>
      </main>
    </ThemeProvider>
  );
}