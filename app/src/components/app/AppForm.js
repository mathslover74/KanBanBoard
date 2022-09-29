/* eslint-disable react-hooks/exhaustive-deps */
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import moment from 'moment'
import {useNavigate} from 'react-router-dom';
import ViewApplication from './ViewApplication';


const AppForm = (props) => {
  let startDate = moment(props.start).format("YYYY-MM-DD")
  let endDate = moment(props.end).format("YYYY-MM-DD")
  const navigate = useNavigate();


  const handleClickOpen = () => {
    console.log("Go to page")
    console.log(props.app_acronym)
    // sessionStorage.setItem("app_name",props.app_acronym)
    // console.log(sessionStorage.getItem("app_name"))
    navigate(`/Application/${props.app_acronym}`)
    // setTimeout(() => {
    //   // navigate("/usermanagement")
    // }, 300)
  }


    return (
        <>
            <TableRow
              key={props.user}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {props.index + 1}
              </TableCell>
              <TableCell align="right">{props.app_acronym}</TableCell>
              <TableCell align="right">{startDate}</TableCell>
              <TableCell align="right">{endDate}</TableCell>
              <TableCell align="right">
                <ViewApplication groupList={props.groupList} app={props.app}/>
              </TableCell>
              <TableCell align="right">
                {/* <a>Hello</a> */}
                <Button variant="outlined" onClick={handleClickOpen}>
                Go to Project
                </Button>
              </TableCell>
            </TableRow>
        </>
    )
}
export default AppForm


