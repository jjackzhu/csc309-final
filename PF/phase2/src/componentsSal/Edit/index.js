import {Grid, TextField, Avatar, CssBaseline, Typography, Link, Box, Button, Container} from "@mui/material";
import logo from "../Static/tfc.png";
import * as React from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";




const Edit = () => {
    //code taken from
    //https://github.com/mui/material-ui/tree/v5.10.16/docs/data/material/getting-started/templates/sign-up
    const navigate = useNavigate();
    const HandleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios.post('http://localhost:8000/accounts/signup/', {
            username: data.get('username'),
            first_name: data.get('firstName'),
            last_name: data.get('lastName'),
            email: data.get('email'),
            phone_number: data.get('phoneNumber'),
            password:data.get('password')
        })
            .then(function (response) {
                console.log(response);
                axios.post('http://localhost:8000/accounts/login/', {
                    username: data.get('username'),
                    password:data.get('password')
                })
                    .then(function (response) {
                        localStorage.setItem('token', response.data.access)
                        console.log(localStorage.getItem('token'));
                    })
                    .catch(function (error) {
                        //catch error code 400
                        console.log(error);
                    });

            })
            .catch(function (error) {
                console.log(error);
            });
        navigate('/classes')
    };

    return (
        <>
            <Container  component="main" maxwidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/*<Avatar alt="TFC" src={logo} sx={{ m: 1, width: 276, height: 150}} variant="square"  />*/}
                    <Typography component="h1" variant="h5">
                        Edit
                    </Typography>
                    <Box component="form" noValidate onSubmit={HandleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="username"
                                    label="Username"
                                    type="username"
                                    id="username"
                                    autoComplete="new-username"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    fullWidth
                                >
                                    Upload Avatar
                                    <input
                                        type="file"
                                        hidden
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm ={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12} sm ={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phoneNumber"
                                    label="Phone Number"
                                    name="phoneNumber"
                                    autoComplete="phone-number"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="http://localhost:3000/login" variant="body2">
                                    Already have an account? Log in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}
export default Edit