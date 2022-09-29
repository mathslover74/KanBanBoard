/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateGroup from '../group/CreateGroup';
import GroupForm from '../group/GroupForm';
import Welcome from '../Welcome';
import { FormGroup } from '@mui/material';
import CreateApplication from './CreateApplication';
import AppForm from './AppForm';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import AppCard from './AppCard';
import CreatePlan from './CreatePlan';
import CreateTask from '../task/CreateTask';
import moment from 'moment'
import Chip from '@mui/material/Chip';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';


 
const Application = ({match}) => {
    
    const [username, setUsername] = useState('');
    const [appp, setAppp] = useState([]);
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [groupList, setGroupList] = useState([]);
    const [plan, setPlan] = useState([]);
    const [appInfo, setAppInfo] = useState({});
    const [TaskList, setTaskList] = useState([]);
    const [submit, setSubmit] = useState(false)
    const navigate = useNavigate();
    const axiosJWT = axios.create();
    // const [promoteB,setPromoteB] = useState(false);
    // const [demoteB,setDemoteB] = useState(false);
    const { id } = useParams()

    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));

    useEffect(() => {
      // console.log("use effect?")
      setSubmit(false)
        getAppInfo()
        getTask()
        getOneApp()
        getGroup()
        getPlan()
        console.log(id)
    }, [submit]);


    useEffect(() => {
      console.log("Refresh token")
        refreshToken();
        // getGroup()
    }, []);

    const checkGroup = (group_name,userGroup) => {
      if(group_name.includes(userGroup)) {
        return true
      } else {
        return false
      }
    }

    const getAppInfo = async () => {
      // console.log("get App ingo")
      // console.log("my id", id)
      try {
        const response = await axiosJWT.post('http://localhost:5000/OneApp', 
          { 
            app_acronym: id
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(response)
          console.log(response.data)
          console.log(response.data[0].app_permit_create)
          // buttonFix("open",response.data[0])
              // console.log(promoteB)
              // console.log(demoteB)
          if(response.status === 200) {
            setAppInfo(response.data[0])
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
            console.log("testing", appInfo)
            // console.log(appInfo.app_permit_create)
            // console.log(appInfo.app_permit_open)
            // console.log(appInfo.app_permit_todolist)
            // console.log(appInfo.app_permit_doing)
            // console.log(appInfo.app_permit_done)
            console.log(sessionStorage.getItem("Group_name"))
            // if(sessionStorage.getItem("Group_name").includes("appInfo.app_permit_open")){
            //   console.log("group_name true")
            // } else {
            //   console.log("group name false")
            // }
              console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")

            
          } else {
            console.log(response.data.message)
          }
      } catch(e) {
        console.log(e)
      }
  }

    const getPlan = async () => {
      console.log("get Plan")
      try {
        const response = await axiosJWT.post('http://localhost:5000/getOnePlan', 
          { 
            plan_app_acronym: id
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log("GGGGGGGGGGGGGGGGGGGGGG")
          console.log(response)
          console.log(response.data)
          if(response.status === 200) {
            if(response.data.message) {
              setPlan([])
            } else {
              setPlan(response.data)
            }
          } else {
            console.log(response.data.message)
          }
      } catch(e) {
        console.log(e)
      }
  }

    const getTask = async () => {
      console.log("get Task")
      try {
        const response = await axiosJWT.post('http://localhost:5000/getTaskByApp', 
          { 
            task_app_acronym: id
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(response.data)
          console.log("get task reached!!!!!!!!!!!!!!!!!!!!!!!!!!")
          if(response.status === 200) {
            if(response.data.message === "No record found") {
              setTaskList([])
            } else {
              setTaskList(response.data)
              console.log(TaskList)
            }

          } else {
            console.log(response.data.message)
          }
      } catch(e) {
        console.log(e)
      }
  }


    const getOneApp = async () => {
      console.log("get App")

      try {
        const response = await axiosJWT.post('http://localhost:5000/OneApp', 
          { 
            app_acronym: id
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(response.data[0])
          if(response.status === 200) {
            setAppp(response.data[0])
          } else {
            console.log(response.data.message)
          }
      } catch(e) {
        console.log(e)
      }
  }
  
    const getGroup = async () => {
        const response = await axiosJWT.get('http://localhost:5000/viewGroup', {
        
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response)
        console.log(response.data)
        setGroupList(response.data)
        console.log(groupList)
    }
 
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            // console.log("TOKEN REFRESHED2 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            // console.log(response.data.accessToken)
            // console.log("refresh token")
            console.log(decoded);
            setUsername(decoded.username);
            setExpire(decoded.exp);
            // console.log("TOKEN REFRESHED @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            // console.log(token)
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
            // console.log("Token interceptor 222222")
            // console.log("response.data.accessToken")
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            // console.log("Token interceptor")
            // console.log(token)
            setUsername(decoded.username);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const convertDate=(date) => {
      return moment(date).format("YYYY-MM-DD")
    }

 
    return (
        <>
        <div>
      <div className= 'topNav'>
        <Welcome />
        <br></br>
        <Typography variant="h2" align="center">{appInfo.app_acronym}</Typography>
        {/* <Typography variant="h2" align="center">Apppp!!!!!!!!!!!!!!</Typography> */}
        <Typography style={{marginBottom:"15px"}} align="center">
          {/* {sessionStorage.getItem("Group_name").includes(appInfo.app_permit_create) ? */}
           {checkGroup(sessionStorage.getItem("Group_name"),appInfo.app_permit_create) ?
          <CreateTask taskNum={TaskList.length} appInfo={appInfo} plan={plan} setSubmit={setSubmit} groupList={groupList}/>
          :""
        }
        <>  </>
        {/* {sessionStorage.getItem("Group_name").includes(appInfo.app_permit_open) ? */}
        {checkGroup(sessionStorage.getItem("Group_name"),appInfo.app_permit_open) ?
        <CreatePlan setSubmit={setSubmit} groupList={groupList}/>
      : ""  
      }
      {/* <CreateTask taskNum={TaskList.length} appInfo={appInfo} plan={plan} setSubmit={setSubmit} groupList={groupList}/>
      <CreatePlan setSubmit={setSubmit} groupList={groupList}/> */}
        {/* </Link> */}
        </Typography>
        <Box style={{marginBottom:"15px"}} sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>

          {plan.map((plan, index) =>
          <Card key={`${plan.plan_mvp_name}_${index}`} style={{margin:"10px"}} sx={{ minWidth: 275 }}>
            {
            (plan.plan_color) ?
            <Typography sx={{ fontSize: 8 , bgcolor: `${plan.plan_color}`, color: `${plan.plan_color}` }} gutterBottom>
              GG
            </Typography> : 
            <Typography sx={{ fontSize: 8 , bgcolor: `white`, color: `white` }} gutterBottom>
            GG
          </Typography>
            }
          <CardContent>
            <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="h6">
            {plan.plan_mvp_name}: {convertDate(plan.plan_startdate)} - {convertDate(plan.enddate)}
            </Typography>
          </CardContent>
        </Card>
          
            // <Item key={`${plan.plan_mvp_name}_${index}`} style={{margin:"10px"}}>{plan.plan_mvp_name}: {convertDate(plan.plan_startdate)} - {convertDate(plan.enddate)} </Item>
            // <Item style={{margin:"10px"}}>{plan.plan_mvp_name}- {moment(({plan.plan_startdate})).format("YYYY-MM-DD")} </Item>
          
          )}
          {/* <> </>
          <Item style={{margin:"10px"}}>2</Item>
          <> </>
          <Item style={{margin:"10px"}}>3</Item> */}

          {/* {TaskList.filter(task => task.task_state === "open").map((task, index) => (
          <AppCard task={task} />
        // <Card sx={{ maxWidth: 345 ,border: '1px solid red'}} style={{marginBottom:"15px"}}>
        //   <CardContent>
        //     <Typography gutterBottom variant="h5" component="div">
        //       {task.task_name}
        //     </Typography>
        //     <Typography variant="body2" color="text.secondary">
        //       {task.task_description}
        //     </Typography>
        //   </CardContent>
        //   <CardActions>
        //     <Button size="small" onClick={demote}>Demote</Button>
        //     <Button size="small">Promote</Button>
        //     <Button size="small">View Log</Button>
        //   </CardActions>
        // </Card>
          ))} */}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={15}>
        <Grid item xs={3}>
            <Item style={{marginBottom:"15px",backgroundColor: "#173F5F",color: "white", width: "100",height: "100" ,marginBottom: "15px",fontWeight: 'bold'}}>Open</Item>
        {TaskList.filter(task => task.task_state === "open").map((task, index) => (
          <AppCard updateB={checkGroup(sessionStorage.getItem("Group_name"),appInfo.app_permit_open) ? true : false} demoteB={false} promoteB={checkGroup(sessionStorage.getItem("Group_name"),appInfo.app_permit_open) ? true : false} submit={submit} appInfo={appInfo} key={task.taskname} plan={plan} setSubmit={setSubmit} task={task} app={appp} cardState="open"/>
          // updateB={sessionStorage.getItem("Group_name").includes(appInfo.app_permit_open) ? true : false}
          // promoteB={sessionStorage.getItem("Group_name").includes(appInfo.app_permit_open) ? true : false}
          // <AppCard demoteB={false} promoteB={true} submit={submit} appInfo={appInfo} key={task.taskname} plan={plan} setSubmit={setSubmit} task={task} app={appp} cardState="open"/>
          ))}
        </Grid>
        <Grid item xs={3}>
          <Item style={{marginBottom:"15px",backgroundColor: "#173F5F",color: "white", width: "100",height: "100" ,marginBottom: "15px",fontWeight: 'bold'}}>To-Do-List</Item>
          {TaskList.filter(task => task.task_state === "todolist").map((task, index) => (
            <AppCard updateB={checkGroup(sessionStorage.getItem("Group_name"),appInfo.app_permit_todolist) ? true : false} demoteB={false} promoteB={checkGroup(sessionStorage.getItem("Group_name"),appInfo.app_permit_todolist) ? true : false} submit={submit} appInfo={appInfo} key={task.taskname} plan={plan} setSubmit={setSubmit} task={task} app={appp} cardState="todolist" />
            // checkGroup(sessionStorage.getItem("Group_name"),appInfo.app_permit_open)
            // <AppCard demoteB={true} promoteB={true} submit={submit} appInfo={appInfo} ey={task.taskname} plan={plan} setSubmit={setSubmit} task={task} app={appp} cardState="todolist" />
          ))}
        </Grid>
        <Grid item xs={3}>
          <Item style={{marginBottom:"15px",backgroundColor: "#173F5F",color: "white", width: "100",height: "100" ,marginBottom: "15px",fontWeight: 'bold'}}>Doing</Item>
          {TaskList.filter(task => task.task_state === "doing").map((task, index) => (
            <AppCard updateB={checkGroup(sessionStorage.getItem("Group_name"),appInfo.app_permit_doing) ? true : false} demoteB={checkGroup(sessionStorage.getItem("Group_name"),appInfo.app_permit_doing) ? true : false} promoteB={checkGroup(sessionStorage.getItem("Group_name"),appInfo.app_permit_doing) ? true : false} submit={submit} appInfo={appInfo} key={task.taskname} plan={plan} setSubmit={setSubmit} task={task} app={appp} cardState="doing"/>
            // sessionStorage.getItem("Group_name").includes(appInfo.app_permit_doing)
            // <AppCard demoteB={true} promoteB={true} submit={submit} appInfo={appInfo} key={task.taskname} plan={plan} setSubmit={setSubmit} task={task} app={appp} cardState="doing"/>
          ))}
          
        </Grid>
        <Grid item xs={3}>
          <Item style={{marginBottom:"15px",backgroundColor: "#173F5F",color: "white", width: "100",height: "100" ,marginBottom: "15px",fontWeight: 'bold'}}>Done</Item>
          {TaskList.filter(task => task.task_state === "done").map((task, index) => (
            <AppCard updateB={checkGroup(sessionStorage.getItem("Group_name"),appInfo.app_permit_done) ? true : false}  demoteB={checkGroup(sessionStorage.getItem("Group_name"),appInfo.app_permit_done) ? true : false} promoteB={checkGroup(sessionStorage.getItem("Group_name"),appInfo.app_permit_done) ? true : false} submit={submit} appInfo={appInfo} key={task.taskname} plan={plan} setSubmit={setSubmit} task={task} app={appp} cardState="done"/>
            // sessionStorage.getItem("Group_name").includes(appInfo.app_permit_done)
            // <AppCard demoteB={true} promoteB={true} submit={submit} appInfo={appInfo} key={task.taskname} plan={plan} setSubmit={setSubmit} task={task} app={appp} cardState="done"/>
          ))}
          
        </Grid>
        <Grid item xs={3}>
          <Item style={{marginBottom:"15px",backgroundColor: "#173F5F",color: "white", width: "100",height: "100" ,marginBottom: "15px",fontWeight: 'bold'}}>Close</Item>
          {TaskList.filter(task => task.task_state === "close").map((task, index) => (
            <AppCard updateB={false}  demoteB={false} promoteB={false} submit={submit} appInfo={appInfo} key={task.taskname} plan={plan} setSubmit={setSubmit} task={task} app={appp} cardState="close"/>
          ))}
        </Grid> 
      </Grid>
    </Box>

        {/* <TableContainer component={Paper}>
      <Table sx={{ width: 300, margin:'auto'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="right">Application</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Go to Application</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appp.map((appp, index) => (
            <AppForm key= {`${appp.app_acronym}${index}`}app_acronym={appp.app_acronym} start={appp.app_startdate} end={appp.app_enddate}token={token} index={index}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
      </div>
    </div>
        </>
    )
}
 
export default Application


