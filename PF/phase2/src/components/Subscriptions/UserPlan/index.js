import { useContext, useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
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
    const [redirectLogin, setRedirectLogin] = useState(false)

    const handleClose = (event, reason) => {
        if (reason && reason === "backdropClick") 
            return;
        setLogin(true);
    }
    
    useEffect(() => {
        //token
        var token = localStorage.getItem("token")
        //if no token, they are not logged-in
        if (!token){
            setLogin(false)
            return
        }
        token = "Bearer " + token

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

    if(redirectLogin){
        return <Navigate to='/login' />
    }

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
              setRedirectLogin(true)
          }}>Login</Button>
        </Box>
      </Modal>
      <UserPlanInfo/>
      </>
    )
}

export default UserPlan;