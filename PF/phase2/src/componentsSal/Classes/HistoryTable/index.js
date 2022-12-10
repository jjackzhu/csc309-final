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


const History = () => {
    const {attended, setAttended } = useContext(APIContext);
    const [selected, setSelected] = useState([]);
    let date = moment()
        .utcOffset('-05:00')
        .format('YYYY-MM-DD HH:mm:ss');
    const navigate = useNavigate();
    const handleClick = (event, name) => {
        // const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (event.target.checked === true){
            newSelected = newSelected.concat(selected, name);
        }
        if (event.target.checked === false){
            newSelected = selected.filter((item) => {
                return item !== name
            })
        }
        setSelected(newSelected)

    };

    const handleDelete = () =>{
        let promises = [];
        console.log(selected)
        for (let i = 0; i < selected.length; i++){
            console.log(selected[i])
            promises.push(
                axios.get(`http://localhost:8000/classes/${selected[i]}/drop/`, {
                    headers: {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
                })
            )

        }
        setAttended([])
        setSelected([])
        Promise.all(promises)
            .then(responses => console.log(responses));
    }

    useEffect(() => {
        axios.get('http://localhost:8000/classes/history/', {
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                setAttended(res.data.results)
            })
            .catch((error) =>{
                if (error.request.status === 401){
                    console.log('here 401')
                    navigate('/login')
                }
            })
    }, [attended])
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
                    User History
                </Typography>
                <Tooltip title="Delete">
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>

            </Toolbar>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Select to Drop
                        </TableCell>
                        <TableCell >Class ID</TableCell>
                        <TableCell >Activity</TableCell>
                        <TableCell >Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {attended.map((obj) => (
                        <TableRow
                            key={obj.user.username + obj.classes.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                {moment(date).isBefore(obj.classes.time) ? (
                                    <Checkbox
                                        color="primary"
                                        onChange={(event) => handleClick(event, obj.classes.id)}/>
                                ) : (
                                    <></>
                                )
                                }
                            </TableCell>
                            <TableCell >{obj.classes.id}</TableCell>
                            <TableCell >{obj.classes.name}</TableCell>
                            <TableCell><Moment>{obj.classes.time}</Moment></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default History;