import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import APIContext from "../../../contextsSal/APIContext";
import Checkbox from "@mui/material/Checkbox";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Moment from 'react-moment';
import moment from 'moment';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Profile = () => {
    const [info, setInfo] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get('http://localhost:8000/accounts/edit/', {
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                console.log(res.data)
                setInfo(res.data)
            })
            .catch((error) =>{
                if (error.request.status === 401){
                    console.log('here 401')
                    // navigate('/login')
                }
            })
    }, [])
    return (
        <>
            <Toolbar sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}>
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Current Info
                </Typography>
                {/*<Tooltip title="Delete">*/}
                {/*    <IconButton onClick={handleDelete}>*/}
                {/*        <DeleteIcon />*/}
                {/*    </IconButton>*/}
                {/*</Tooltip>*/}

            </Toolbar>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell >Email</TableCell>
                        <TableCell >First Name</TableCell>
                        <TableCell >Last Name</TableCell>
                        <TableCell >Phone Number</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                            <TableCell >{info.username}</TableCell>
                            <TableCell> {info.email}</TableCell>
                            <TableCell >{info.first_name}</TableCell>
                            <TableCell>{info.last_name}</TableCell>
                            <TableCell>{info.phone_number}</TableCell>
                        </TableRow>
                </TableBody>
            </Table>
        </>
    )
}

export default Profile;