import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import APIContext from "../../../contextsSal/APIContext";
import Checkbox from "@mui/material/Checkbox";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import Moment from 'react-moment';
import moment from 'moment';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const StudioInfo = ({studio_id}) => {
    const [available, setAvailable] = useState([]);

    const [chosen, setChosen] = useState([]);

    const[reload, setReload] = useState(true)

    let date = moment()
        .utcOffset('-05:00')
        .format('YYYY-MM-DD HH:mm:ss');
    const navigate = useNavigate();
    const handleClick = (event, name) => {
        // const selectedIndex = selected.indexOf(name);
        let newChosen = [];

        if (event.target.checked === true){
            newChosen = newChosen.concat(chosen, name);
        }
        //THIS PART DOES NOT GET CHECK ANYMORE IS IT CUZ OF USEEFFECT?
        if (event.target.checked === false){
            newChosen = chosen.filter((item) => {
                return item !== name
            })
        }
        setChosen(newChosen)
        setReload(false)

    };
    const handleEnroll = () =>{
        let promises = [];
        console.log(chosen)
        for (let i = 0; i < chosen.length; i++){
            promises.push(
                axios.get(`http://localhost:8000/classes/${chosen[i]}/enroll/`, {
                    headers: {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
                })
            )

        }
        setAvailable([])
        setChosen([])
        setReload(true)
        Promise.all(promises)
            .then(responses => console.log(responses));
    }

    useEffect(() => {
        if (reload) {
            axios.get(`http://localhost:8000/classes/${studio_id}/info/`)
                .then((res) => {
                    setAvailable(res.data.results)
                })
                .catch((error) => {
                    if (error.request.status === 401) {
                        console.log('here 401')
                        navigate('/login')
                    }
                })
        }
    }, [reload])
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
                    Studio Schedule
                </Typography>
                <Tooltip title="Enroll">
                    <IconButton onClick={handleEnroll}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>

            </Toolbar>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Select to Enroll
                        </TableCell>
                        <TableCell >Class ID</TableCell>
                        <TableCell >Activity</TableCell>
                        <TableCell >Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {available.map((obj) => (
                        <TableRow
                            key={obj.id + obj.time}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                {moment(date).isBefore(obj.time) ? (
                                    <Checkbox
                                        color="primary"
                                        onChange={(event) => handleClick(event, obj.id)}/>
                                ) : (
                                    <></>
                                )
                                }
                            </TableCell>
                            <TableCell >{obj.id}</TableCell>
                            <TableCell >{obj.name}</TableCell>
                            <TableCell><Moment>{obj.time}</Moment></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default StudioInfo;
