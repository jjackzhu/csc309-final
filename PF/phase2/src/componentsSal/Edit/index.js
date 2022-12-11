import {Grid, TextField, Avatar, CssBaseline, Typography, Link, Box, Button, Container} from "@mui/material";
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import logo from "../Static/tfc.png";
import * as React from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import NavBar from "../NavBar"
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import ProfileTable from "./ProfileTable";



const Edit = () => {
    //code taken from
    //https://github.com/mui/material-ui/tree/v5.10.16/docs/data/material/getting-started/templates/sign-up
    const navigate = useNavigate();

    const mdTheme = createTheme();
    const HandleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('username'))
        axios.put('http://localhost:8000/accounts/edit/', {
            username: data.get('username'),
            first_name: data.get('firstName'),
            last_name: data.get('lastName'),
            email: data.get('email'),
            phone_number: data.get('phoneNumber'),
            password: data.get('password')
        }, {
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(localStorage.getItem('token'))
                console.log(error);
            });
        navigate('/edit')
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <NavBar/>
                <Box
                    component="form"
                    noValidate
                    onSubmit={HandleSubmit}
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar/>
                    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>

                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                                    <ProfileTable/>
                                </Paper>
                            </Grid>

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
                            Edit
                        </Button>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
export default Edit