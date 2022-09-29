/* eslint-disable react-hooks/exhaustive-deps */
import TableCell from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';

const GroupForm = (props) => {
    return (
        <>
            <TableRow
              key={props.user}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {props.index + 1}
              </TableCell>
              <TableCell align="right">{props.groupList}</TableCell>
              <TableCell align="right">
                {/* <a>Hello</a> */}
              </TableCell>
            </TableRow>
        </>
    )
}
export default GroupForm


