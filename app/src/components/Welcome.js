/* eslint-disable react-hooks/exhaustive-deps */
import Typography from '@mui/material/Typography';


const Welcome = (props) => {
    return (
        <>
        <Typography variant="h3" align="left">Welcome {sessionStorage.getItem("username")}</Typography>

        </>
    )
}
export default Welcome


