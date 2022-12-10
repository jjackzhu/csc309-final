import { useContext, useState,  useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Input from "../../controls/Input";
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

function useForm(initialFValues, validateOnChange = false, validate) {


    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

    const resetForm = () => {
        setValues(initialFValues);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm

    }
}

const initialFValues = {
    card_num: '',
    cvv: '',
    name: '',
    expires_in: '',
}

function CardDisplay() {
    const { card, setCard, showCardModal, setShowCardModal } = useContext(APIContext);
    const [newCard, setNewCard] = useState(null)

    const handleClose = () => setShowCardModal(false);

    var method = null;

    const isMountRef = useRef(true);
    useEffect(() => {
        //token
        // const token = localStorage.getItem("token")
        const token = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNzIxMTg2LCJpYXQiOjE2NzA2MzQ3ODYsImp0aSI6ImNjZmU1Njg1ZjM1MjRjYWY4NjExNTA1NzlmMDU5NTM4IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZG1pbiJ9.dsecS9YM9m2aSk2SGFFu4z0DYY-NKX4N6uA0hrVzryg"

        if (isMountRef.current || !newCard) { 
            isMountRef.current = false;
            return;
        }
        const redirect = fetch(`http://localhost:8000/subscriptions/my_card/update/`,
        {
            method: 'GET',
            headers: {
                'Authorization': token,
            }
        })
        .then(res => res.json())
        .then(json => {
            if (!json || json.detail){
                setCard(null)
                method = null
            } else if (json.redirect === "add"){
                method = "POST"
            }else{
                method = "PUT"
            }
            
            if (method){
                return fetch(`http://localhost:8000/subscriptions/my_card/${json.redirect}/`,
                {
                method: method,
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCard)
                })
            }else{
                return null
            }
            
        }).catch(error => {
            console.log("Redirect fetch error", error)
        });

        if (redirect){
            redirect
            .then(res => res.json())
            .then(json => {
                setCard(json)
                alert("Your card has been updated succesfully")})
            .catch(error => {console.log("Could not update", error)})
        }
        
    }, [newCard])
    

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('card_num' in fieldValues){
            if(!fieldValues.card_num){
                temp.card_num = "This field is required."
            }else if (!(/^[0-9]*$/.test(fieldValues.card_num))){
                temp.card_num = "Must contain only numbers."
            }else if (!(/^[0-9]{15,19}$/.test(fieldValues.card_num))){
                temp.card_num = "Must have length between 15-19."
            }else{
                temp.card_num = ''
            }
        }
        if ('cvv' in fieldValues)
            if(!fieldValues.cvv){
                temp.cvv = "This field is required."
            }else if (!(/^([a-zA-Z0-9_-]){3,4}$/.test(fieldValues.cvv))){
                temp.cvv = "Must contain 3-4 characters."
            }else{
                temp.cvv = ''
            }
        if ('name' in fieldValues)
            if(!fieldValues.name){
                temp.name = "This field is required."
            }else if (!(/^[A-Za-z\s]*$/.test(fieldValues.name))){
                temp.name = "No numbers or special characters."
            }else{
                temp.name = ''
            }
        
        var today = new Date();
        var today_month = today.getMonth() + 1
        var today_year = parseInt(today.getFullYear().toString().substr(-2))
        if ('expires_in' in fieldValues)
            if(!fieldValues.expires_in){
                temp.expires_in = "This field is required."
            }else if (!(/^((0[1-9]|1[0-2])\/[0-9]{2})$/.test(fieldValues.expires_in))){
                temp.expires_in = "Expiry data must be valid and in format MM/YY."
            }else{
                const [month, year] = fieldValues.expires_in.split('/');
                if(year < today_year || (parseInt(year) === today_year && parseInt(month) < today_month)){
                    temp.expires_in = "Card is expired."
                }else{
                    temp.expires_in = ''
                }
            }

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = (event) => {
        event.preventDefault()
        if (validate()){
            setNewCard(values)
            handleClose()
            resetForm()
        }
      };

    return (
        <>
            <Dialog open={showCardModal} 
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogTitle>Add credit card</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please fill in info below
                </DialogContentText>
                    <Container component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Input
                        name="card_num"
                        label="Card Number"
                        value={values.card_num}
                        onChange={handleInputChange}
                        error={errors.card_num}
                    />
                    <Input
                        name="cvv"
                        label="CVV"
                        value={values.cvv}
                        onChange={handleInputChange}
                        error={errors.cvv}
                    />
                    <Input
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Input
                        name="expires_in"
                        label="Expiry Date (MM/YY)"
                        value={values.expires_in}
                        onChange={handleInputChange}
                        error={errors.expires_in}
                    />
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={() =>{

                    }}>Add Card</Button>
                </Container>
                
                </DialogContent>
                <DialogActions>
                
                </DialogActions>
            </Dialog>
            <Container sx={{ pt: 8, pb: 6 }}>
                
                <Card sx={style}>
                    <CardHeader
                    title="Credit Card Info"
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
                        <b>Card Number</b> {card ? card.card_num: "N/A"}
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                        <b>cvv</b> {card ? card.cvv: "N/A"}
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                        <b>Name</b> {card ? card.name: "N/A"}
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                        <b>Expiry date</b> {card ? card.expires_in: "N/A"}
                        </Typography>
                    </Box>
                    </CardContent>
                    <CardActions>
                    <Button fullWidth 
                    variant="contained" 
                    onClick={() => { 
                        setShowCardModal(true)
                    }}>
                        <b>{card ? "Edit Card": "Add Card"}</b>
                    </Button>
                    </CardActions>
                </Card>
            </Container>
        </>
      );
}

export default function CardInfo() {
    return <CardDisplay />;
  }