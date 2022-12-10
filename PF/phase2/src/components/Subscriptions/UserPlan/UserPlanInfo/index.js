import { useContext, useState,  useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import APIContext from "../../Contexts/APIContext";


const style = {
    maxWidth: "50em",
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    },
    border: "5px white"
}

function UserPlanDisplay() {
    const [redirect, setRedirect] = useState(false);

    const { userPlan, setUserPlan, subscribed , updatePlan, change, setChange} = useContext(APIContext);

    const [ name, setName ] = useState(null);

    useEffect(() => {
        if (userPlan && userPlan.sub_plan)
            {fetch(`http://localhost:8000/subscriptions/?limit=${userPlan.sub_plan}&offset=0`)
            .then(res => res.json())
            .then(json => {
                setName(json.results[userPlan.sub_plan - 1].name)
            }).catch(error => {console.log("ERROR FROM THE BACKEND", error)})}
        else{
            setName(null)
        }
    }, [userPlan, subscribed, updatePlan])
    
    if(redirect){
        return <Navigate to='/subscriptions/' />
    }

    return (
        <>
            <Container sx={{ pt: 8, pb: 6 }}>
                
                <Card sx={style}>
                    <CardHeader
                    title="Your Subscription Plan"
                    titleTypographyProps={{ variant: "h4", align: 'center', fontWeight: "bold" }}
                    subheaderTypographyProps={{
                        align: 'center',
                    }}
                    sx={{
                        backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[700],
                    }}
                    />
                    <CardContent>
                    <Box
                        sx={{
                        display: 'block',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        }}
                    >
                        <Typography variant="h5" color="text.secondary">
                        <b>Plan</b> {name ? name : "N/A"}
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                        <b>{userPlan.sub_plan ? 'Next Payment Date' : 'Expires'}</b> {userPlan.expires_in ? userPlan.expires_in : "N/A"}
                        </Typography>
                        <br/>
                        <Typography variant="h6" color="black" align='center'>
                        {userPlan.sub_plan ? '' : (userPlan.expires_in ? 'You have unsubscribed': 'You are not subscribed')}
                        </Typography>
                    </Box>
                    </CardContent>
                    <CardActions>
                    <Button fullWidth 
                    // style={{backgroundColor: "#FA991C", disabledBackground: 'white',}}
                    variant="contained" 
                    onClick={() => { 
                        setRedirect(true)                                  
                    }}>
                        <b>{userPlan.sub_plan ? 'Edit Plan' : 'Subscribe'}</b>
                    </Button>
                    <Button fullWidth 
                    // style={{backgroundColor: "#FA991C", disabledBackground: 'white',}}
                    variant="contained" 
                    disabled={!userPlan.sub_plan}
                    onClick={() => { 
                        // const token = localStorage.getItem("token")
                        const token = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNzIxMTg2LCJpYXQiOjE2NzA2MzQ3ODYsImp0aSI6ImNjZmU1Njg1ZjM1MjRjYWY4NjExNTA1NzlmMDU5NTM4IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZG1pbiJ9.dsecS9YM9m2aSk2SGFFu4z0DYY-NKX4N6uA0hrVzryg"

                        fetch(`http://localhost:8000/subscriptions/unsubscribe/`,
                            {
                                method: 'GET',
                                headers: {
                                    'Authorization': token,
                                }
                        })
                            .then(res => res.json())
                            .then(json => {
                            }).catch(error => {
                                console.log("Unsubscribe error", error)
                            });
                        
                        setChange(!change)
                        setName(null)  
                        setUserPlan({sub_plan: null})
                                       
                    }}>
                        <b>Unsubscribe</b>
                    </Button>
                    </CardActions>
                </Card>
            </Container>
        </>
      );
}

export default function UserPlanInfo() {
    return <UserPlanDisplay />;
  }