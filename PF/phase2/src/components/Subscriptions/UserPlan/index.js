import { useContext, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import APIContext from "../Contexts/APIContext";
import UserPlanInfo from "./UserPlanInfo";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

function UserPlan() {
    const { setUserPlan, change, setSubscribed, subscribed } = useContext(APIContext);
    const [login, setLogin] = useState(true)

    const handleClose = (event, reason) => {
        if (reason && reason === "backdropClick") 
            return;
        setLogin(true);
    }
    
    useEffect(() => {
        // const token = localStorage.getItem("token")
        const token = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNzIxMTg2LCJpYXQiOjE2NzA2MzQ3ODYsImp0aSI6ImNjZmU1Njg1ZjM1MjRjYWY4NjExNTA1NzlmMDU5NTM4IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZG1pbiJ9.dsecS9YM9m2aSk2SGFFu4z0DYY-NKX4N6uA0hrVzryg"
    
        fetch(`http://localhost:8000/subscriptions/my_plan/`,
        {
            method: 'GET',
            headers: {
                'Authorization': token,
            }
        })
        .then(res => res.json())
        .then(json => {
            if(json.detail){
                setUserPlan(null)        
            }else{
                setUserPlan(json)
            }
            setSubscribed(!subscribed)
        }).catch(error => {
            console.log("Retreive User plan error", error)
        })
    }, [change])

    return (
        <><Modal
        open={!login}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You are not logged-in
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please login to see payment history.
          </Typography>
          <br/>
          <Button variant="contained" size='large' m={5} onClick={() => {
              console.log("redirect to login")
          }}>Login</Button>
        </Box>
      </Modal>
      <UserPlanInfo/>
      </>
    )
}

export default UserPlan;