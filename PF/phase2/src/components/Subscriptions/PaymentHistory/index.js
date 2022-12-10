import {useContext, useEffect, useState, useRef} from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import PaymentList from "./PaymentsTable";
import APIContext from "../Contexts/APIContext";

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

const PaymentHistory = () => {
    const perPage = 5;
    const [params, setParams] = useState({page: 1})
    const [login, setLogin] = useState(true)
    const { payments, setPayments, subPlan, card } = useContext(APIContext);

    const handleClose = (event, reason) => {
        if (reason && reason == "backdropClick") 
            return;
        setLogin(true);
    }

    var prevDisable = params.page === 1 ? true : false
    var nextDisable;

    if (payments){
        nextDisable = payments.length < perPage
    }else{
        nextDisable = true
    }
    
    useEffect(() => {
        //token
        // const token = localStorage.getItem("token")
        const token = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNzIxMTg2LCJpYXQiOjE2NzA2MzQ3ODYsImp0aSI6ImNjZmU1Njg1ZjM1MjRjYWY4NjExNTA1NzlmMDU5NTM4IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZG1pbiJ9.dsecS9YM9m2aSk2SGFFu4z0DYY-NKX4N6uA0hrVzryg"

        fetch(`http://localhost:8000/subscriptions/my_payments/?limit=${perPage}&num_future_payments=${perPage*params.page}&offset=${perPage*(params.page - 1)}`, {
            method: 'GET',
            headers: {
                'Authorization': token,
            }
        })
        .then(res => res.json())
        .then(json => {
            if (json.results){
                setPayments(json.results);
                setLogin(true)
            }else{
                setLogin(false)
            }
        }).catch(error => {console.log("Error fetching payments", error)});
    }, [params, subPlan, card])

    return(
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
                console.log("redirect to login")
            }}>Login</Button>
          </Box>
        </Modal>
        <Container maxWidth="xl" component="main">
        <PaymentList perPage={perPage} params={params} />
        <Stack
              m={5}
              direction="row"
              spacing={'2em'}
              justifyContent="center"
            >
                <Button variant="contained" size='large' m={5} disabled={prevDisable} onClick={() => setParams({
                    ...params,
                    page: Math.max(1, params.page - 1)
                })}>
                    prev
                </Button>
                <Button variant="contained" size='large' m={5} disabled={nextDisable} onClick={() => setParams({
                    ...params,
                    page: params.page + 1
                })}>
                    next
                </Button>
        </Stack>
        </Container>
        </>
    )
}

export default PaymentHistory;