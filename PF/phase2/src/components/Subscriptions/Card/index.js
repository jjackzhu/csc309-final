import { useContext, useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import APIContext from "../Contexts/APIContext";
import CardInfo from "./CardDisplay";

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

function Card() {
    const { card, setCard } = useContext(APIContext);
    const [login, setLogin] = useState(true)
    const [redirect, setRedirect] = useState(false)

    const handleClose = (event, reason) => {
        if (reason && reason == "backdropClick") 
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

        fetch(`http://localhost:8000/subscriptions/my_card/`,
        {
            method: 'GET',
            headers: {
                'Authorization': token,
            }
        })
        .then(res => res.json())
        .then(json => {
            if(!json || json.detail){
                setCard(null)
                if (json.detail === 'User has not added a payment method'){
                    //pass
                }else{
                    setLogin(false)
                }
            }else{
                setCard(json)
            }
        }).catch(error => {
            console.log("Retreive card error", error)
        })
    }, [])

    if(redirect){
        return <Navigate to='/login' />
    }
    return (
        <>
        <Modal
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
                setRedirect(true)
            }}>Login</Button>
          </Box>
        </Modal>
        <CardInfo/>
        </>
    )
}

export default Card;