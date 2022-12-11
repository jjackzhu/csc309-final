import {useContext, useEffect, useState} from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Alert from '@mui/material/Alert';

const ClassList = ({classes, studio_id}) => {

    const [message, setMessage] = useState({message: "", severity: "", display: "none"})

    const navigate = useNavigate();
    const handleEnroll = (event) => {
        event.preventDefault();
        var class_id = event.target.getAttribute("id")

        axios.get(`http://localhost:8000/classes/${class_id}/enroll/`, {
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            if (res.data.detail){
                setMessage({message: res.data.detail, severity: "error", display: "visible"})
            }
            else if (res.data.success) {
                setMessage({message: "Enrolled", severity: "success", display: "visible"})
            }
        })
        .catch((error) => {
            if (error.request.status === 401) {
                console.log('here 401')
                navigate('/login')
            }
        })
    }

    // card code from https://mui.com/material-ui/react-card/
    return (classes && message) ? (
        <Container sx={{ py: 4 }} maxWidth="md">
        <Alert severity={message.severity} sx={{display: message.display}}> {message.message} </Alert>
        <Grid container spacing={4} align="center" alignItems="center" justifyContent="center">
            {classes.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} key={index}>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="div">
                        {item.name}
                    </Typography>
                    <Typography variant="body2">
                        {item.description} <br/>
                        Coach: {item.coach}<br/>
                        Capacity: {item.capacity}<br/>
                        Keywords: {item.keywords}
                    </Typography>
                    <Typography variant="body2">
                        {item.time} - {item.end_recurrence}
                    </Typography>
                </CardContent>
                <CardActions align="center" alignItems="center" justifyContent="center">
                <Button variant="contained" id={item.id} onClick={handleEnroll}>Enroll</Button>
                </CardActions>
            </Card>
            </Grid>
        ))}
        </Grid>
        </Container>
    ):<></>


}
export default ClassList