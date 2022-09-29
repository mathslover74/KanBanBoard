import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from 'react'
import AuditLog from '../audit/AuditLog';
import moment from 'moment'

const AppCard = (props) => {
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [username, setUsername] = useState('');
  const [taskOwner, setTaskOwner] = useState('');
  const [promoteB,setPromoteB] = useState(false);
  const [demoteB,setDemoteB] = useState(false);
  const [groupSearch, setGroupSearch] = useState("")

  // useEffect(() => {
    
  //   checkGroup(sessionStorage.getItem('username'),)
  // }, [props.submit]);

  // const checkGroup = async (username,group_name) => {
  //   const response = await axios.post("http://localhost:5000/checkGroup" ,
  //       {
  //         username: username,
  //         group_name: group_name
  //       }).then(result => {
  //         console.log(result)
  //         console.log(result.data.message)
  //         if(result.data.message) {
  //           return true
  //           // sessionStorage.setItem("admin", true)
  //           // console.log("admin set")
  //         }else {
  //           console.log("LOL")
  //           return false
  //         }
  //           // console.log(sessionStorage.getItem("admin"))
  //       })

        // console.log(response.data.message)
        // if (response.data.message) {
        //   sessionStorage.setItem("admin", true)
        //   console.log("admin set")
        // }
        // console.log("check admin reached")
  // }

  
  // const [cardColor, setCardColor] = useState('')
  // const [arrNote, setArrNote] = useState(props.task.task_notes.split(","))
//   let grouptest = sessionStorage.getItem("Group_name")
// if(props.cardState ==="open") {
//   if(grouptest.includes(props.appInfo.app_permit_open)){
//     console.log("Off demote, on promote")
//     // setDemoteB(false)
//     // setPromoteB(true)
//   } else {
//     console.log("off all")
//   }
// } else if (props.cardState ==="todolist") {
//   if(grouptest.includes(props.appInfo.app_permit_todolist)){
//     console.log("off Demote, on promote")
//     // setDemoteB(false)
//     // setPromoteB(true)
//   } else {
//     console.log("off all")
//   }
// } else if (props.cardState ==="doing") {
//   if(grouptest.includes(props.appInfo.app_permit_doing)){
//     console.log("on Demote, on promote")
//     // setDemoteB(true)
//     // setPromoteB(true)
//   } else {
//     console.log("off all")
//   }
// } else if (props.cardState ==="done") {
//   if(grouptest.includes(props.appInfo.app_permit_done)){
//     console.log("on Demote, on promote")
//     // setDemoteB(true)
//     // setPromoteB(true)
//   } else {
//     console.log("off all")
//   }
// } else {
//   console.log("off all")
// }

  // const buttonFix = (state,appInfo) => {
  //   let grouptest = sessionStorage.getItem("Group_name")
  //   switch (state) {
  //     case "open":
  //       console.log("open")
  //       if(state==="open" && grouptest.includes(appInfo.app_permit_open)) {
  //         console.log("Off demote, on promote")
  //         setDemoteB(false)
  //         setPromoteB(true)
  //       } else {
  //         console.log("off all")
  //       }
  //       return
  //     case "todolist":
  //       console.log("todolist")
  //       if(state==="todolist" && grouptest.includes(appInfo.app_permit_todolist)) {
  //         console.log("off Demote, on promote")
  //         setDemoteB(false)
  //         setPromoteB(true)
  //       } else {
  //         console.log("off all")
  //       }
  //       return
  //     case "doing":
  //       console.log("doing")
  //       if(state==="doing" && grouptest.includes(appInfo.app_permit_doing)) {
  //         console.log("on Demote, on promote")
  //         setDemoteB(true)
  //         setPromoteB(true)
  //       } else {
  //         console.log("off all")
  //       }
  //       return
  //     case "done":
  //       console.log("done")
  //       if(state==="done" && grouptest.includes(appInfo.app_permit_done)) {
  //         console.log("on Demote, on promote")
  //         setDemoteB(true)
  //         setPromoteB(true)
  //       } else {
  //         console.log("off all")
  //       }
  //       return 
  //     default:
  //       setPromoteB(false)
  //       setDemoteB(false)
  //       return
  //   }
  // }

  // // console.log(props.appInfo)

  // useEffect(() => {
  //   buttonFix(props.cardState,props.appInfo)

  // }, [props.submit]);
  // console.log(props.cardState)
  // console.log(props.promoteB)
  // console.log(props.demoteB)


let cardColor = "white"
// console.log(props.plan)
// console.log(props.task)
if (props.task.task_plan) {
  for (let i = 0; i<props.plan.length; i++) {
    if(props.plan[i].plan_mvp_name===props.task.task_plan) {
      // console.log(`${props.task.task_plan} match`)
      cardColor = props.plan[i].plan_color
      // console.log(props.plan[i].plan_color)
    }
    // setCardColor(props.plan[i].plan_color)
  }
} else {
  cardColor ="white"
}
  // console.log("Card color")
  // console.log(cardColor)

  


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

const addLog = (username,state,taskname,string) => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  // console.log(`${moment(Date.now()).format("YYYY-MM-DD, HH:mm:ss")}: ${username} - ${status} ${taskname} from ${state} to ${next}`)
  try {
    const response = axiosJWT.post('http://localhost:5000/createAudit', 
      {
        login_userid: username,
        current_state: state,
        time_stamp: moment(Date.now()).format("YYYY-MM-DD, HH:mm:ss"),
        task_name: taskname,
        note: string
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

const demote = async (e) => {
  e.preventDefault();
  // console.log(props.cardState)
  // console.log(props.task.task_name)
  // console.log(props.task.task_state)
  let arr = ["open","todolist","doing","done","close"]
  console.log("demote")
  let num = 0
  
  for (let i = 1; i<arr.length; i++) {
    if(arr[i]===props.cardState) {
      num = i-1
      console.log(num)
    }
    permitSubmit(num)
  }
// addLog(sessionStorage.getItem('username'),props.cardState,arr[num],props.task.task_name,"demote")
// console.log(num)
// console.log(props.app.app_permit_done)
// console.log(taskOwner)
// let string = console.log(`${moment(Date.now()).format("YYYY-MM-DD - HH:mm:ss")}: ${sessionStorage.getItem('username')} - Demote ${props.task.task_name} from ${props.cardState} to ${arr[num]}`)
// console.log(string)
let string = `${moment(Date.now()).format("YYYY-MM-DD - HH:mm:ss")}: ${sessionStorage.getItem('username')} - Demote ${props.task.task_name} from ${props.cardState} to ${arr[num]}`
  console.log(string)
  console.log(`${props.task.task_notes},${string}`)

  console.log(taskOwner)
  try {
    const response = await axiosJWT.post('http://localhost:5000/demoteTask/', 
      {
        task_name: props.task.task_name,
        state: props.task.task_state,
        task_owner: sessionStorage.getItem("username"),
        task_notes: `${props.task.task_notes},${string}`
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response)
      if(response.status === 200) {
        addLog(sessionStorage.getItem('username'),props.cardState,props.task.task_name,string)
        props.setSubmit(true)
        // window.location.reload()
        console.log("Demoted")
          // console.log(plan)
      } else {
        console.log(response.data.message)
      }
  } catch(e) {
    console.log(e)
  }
}

const permitSubmit = (num) => {
  console.log(num)
  console.log(props.appInfo)
  if(num === 0) {
    setTaskOwner(props.appInfo.app_permit_open)
    console.log("reach 0")
    console.log(props.appInfo.app_permit_open)
    console.log(typeof(props.appInfo.app_permit_open))
    console.log(taskOwner)
    return props.appInfo.app_permit_open
  } else if(num === 1) {
    console.log("reach 1")
    console.log(props.appInfo.app_permit_todolist)
    console.log(typeof(props.appInfo.app_permit_todolist))
    setTaskOwner(props.appInfo.app_permit_todolist)
    return props.appInfo.app_permit_todolist
    console.log(taskOwner)
  } else if (num === 2) {
    console.log("reach 2")
    console.log(props.appInfo.app_permit_doing)
    console.log(typeof(props.appInfo.app_permit_doing))
    setTaskOwner(props.appInfo.app_permit_doing)
    return props.appInfo.app_permit_doing
    console.log(taskOwner)
  } else if(num === 3){
    console.log("reach 3")
    console.log(props.appInfo.app_permit_done)
    console.log(typeof(props.appInfo.app_permit_done))
    setTaskOwner(props.appInfo.app_permit_done)
    console.log(taskOwner)
    return props.appInfo.app_permit_done
  } else {
    return ""
  }
  // switch(num) {
  //   case 0:
  //     // setTaskOwner(props.app.app_permit_open)
  //     setTaskOwner(props.appInfo.app_permit_open)
  //     console.log(taskOwner)
      
  //     return;
  //   case 1 :
  //     // setTaskOwner(props.app.app_permit_todolist)
  //     setTaskOwner(props.appInfo.app_permit_todolist)
  //     console.log(taskOwner)
  //     return;
  //   case 2 :
  //     // setTaskOwner(props.app.app_permit_doing)
  //     setTaskOwner(props.appInfo.app_permit_doing)
  //     console.log(taskOwner)
  //     return;
  //   case 3 :
  //     // setTaskOwner(props.app.app_permit_done)
  //     setTaskOwner(props.appInfo.app_permit_done)
  //     console.log(taskOwner)
  //     return;
  //   case 4 :
  //     // string = props.app.app_permit_close
  //     return;
  //   default:
  // }
}

const promote = async (e) => {
  e.preventDefault();
  // console.log(props.cardState)
  // console.log(props.task.task_name)
  // console.log(props.task.task_state)
  let arr = ["open","todolist","doing","done","close"]
  console.log("promote")
  console.log(taskOwner)
  let num = 0

  for (let i = 0; i<arr.length-1; i++) {
    if(arr[i]===props.cardState) {
      num = i+1
      console.log("match$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
      permitSubmit(num)
    }
    console.log(num)
  }
// console.log(props.app.app_permit_done)
  console.log(taskOwner)
  // console.log(`${moment(Date.now()).format("YYYY-MM-DD - HH:mm:ss")}: ${sessionStorage.getItem('username')} - Demote ${props.task.task_name} from ${props.cardState} to ${arr[num]}`)
  let string = `${moment(Date.now()).format("YYYY-MM-DD - HH:mm:ss")}: ${sessionStorage.getItem('username')} - Promote ${props.task.task_name} from ${props.cardState} to ${arr[num]}`
  console.log(string)
  console.log(`${props.task.task_notes},${string}`)
  console.log(props.task.task_plan)
  console.log(props.plan)
  for (let i = 0; i<props.plan.length; i++) {
    if(props.plan[i].plan_mvp_name===props.task.task_plan)
    console.log(`${props.task.task_plan} match`)
  }
  try {
    const response = await axiosJWT.post('http://localhost:5000/promoteTask/', 
      {
        task_name: props.task.task_name,
        state: props.task.task_state,
        task_owner: sessionStorage.getItem("username"),
        task_notes: `${props.task.task_notes},${string}`
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response)
      if(response.status === 200) {
        if(props.cardState === "doing") {
          console.log("Doing in send email reach!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
          console.log(true)
          console.log(sessionStorage.getItem('username'))
          console.log(props.app)
          console.log(props.app.app_permit_done)
          console.log(sessionStorage.getItem('email'))
          console.log(props.task.task_name)

          try {
            const response = axiosJWT.post('http://localhost:5000/sendEmail', 
              {
                username: sessionStorage.getItem('username'),
                group_name: props.app.app_permit_done, /// group name
                email: sessionStorage.getItem('email'), /// current user email
                task: props.task.task_name /// task name
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
        addLog(sessionStorage.getItem('username'),props.cardState,props.task.task_name,string)
        props.setSubmit(true)
        // window.location.reload()
        console.log("Promoted")
          // console.log(plan)
      } else {
        console.log(response.data.message)
      }
  } catch(e) {
    console.log(e)
  }
}

    return (
        <>
        <Card sx={{border: '1px solid red'}} style={{marginBottom:"15px"}}>
        {/* {
            (props.plan.plan_mvp_name === props.task.task_plan)) ?
            <Typography sx={{ fontSize: 8 , bgcolor: `${plan.plan_color}`, color: `${plan.plan_color}` }} gutterBottom>
              GG
            </Typography> : 
            <Typography sx={{ fontSize: 8 , bgcolor: `white`, color: `white` }} gutterBottom>
            GG
          </Typography>
            } */}
      <Typography sx={{ fontSize: 8 ,  bgcolor: `${cardColor}`, color: `${cardColor}` , overflow: 'auto'}} gutterBottom>
            GG
          </Typography>
          <CardContent style={{padding:"5px"}} >
            <Typography align='center' gutterBottom variant="h6" component="div">
           {props.task.task_name}
            </Typography>
            <Typography  gutterBottom variant="body" component="div">
            Task ID -  {props.task.task_id}
            </Typography>
            <Typography gutterBottom variant="body" component="div">
              Task Owner - {props.task.task_owner}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary" style={{height:"150px", overflow:"scroll", scrollbarWidth:"thin"}}>
              {props.task.task_description}
            </Typography> */}
          </CardContent>
          <CardActions>
            {props.demoteB ? 
            <Button variant='contained' size="small" onClick={demote}>Demote</Button>
            : ""
          }
            {props.promoteB ?
            <Button variant='contained' size="small" onClick={promote}>Promote</Button>
          :""  
          }
            <AuditLog updateB={props.updateB} cardState={props.cardState} appInfo={props.appInfo}cardColor={cardColor} plan={props.plan} setSubmit={props.setSubmit} task ={props.task} state={props.task.task_state}/>
          </CardActions>
        </Card>
        </>
    )
}
export default AppCard


