import {Grid, TextField, Avatar, CssBaseline, Typography, Link, Box, Button, Container} from "@mui/material";
import logo from "../Static/tfc.png";
import * as React from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";




const LogIn = () => {
    //code taken from
    //https://github.com/mui/material-ui/tree/v5.10.16/docs/data/material/getting-started/templates/sign-up
    const navigate = useNavigate();
    const HandleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios.post('http://localhost:8000/accounts/login/', {
            username: data.get('username'),
            password:data.get('password')
        })
            .then(function (response) {
                console.log(response)
                localStorage.setItem('token', response.data.access)
                console.log(localStorage.getItem('token'))
                console.log(localStorage.getItem('token'));
            })
            .catch(function (error) {
                //catch error code 400
                console.log(localStorage.getItem('token'));
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
                    <Avatar alt="TFC" src={logo} sx={{ m: 1, width: 276, height: 150}} variant="square"  />
                    <Typography component="h1" variant="h5">
                        Log In
                    </Typography>
                    <Box component="form" noValidate onSubmit={HandleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
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
                            Log In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="http://localhost:3000/" variant="body2">
                                    Don't have an account? Sign up for one!
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}
export default LogIn