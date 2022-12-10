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

const ClassList = ({classes}) => {


    // card code from https://mui.com/material-ui/react-card/
    return classes && (
        <Container sx={{ py: 4 }} maxWidth="md">
        <Grid container spacing={4} align="center" alignItems="center" justifyContent="center">
            {classes.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} key={index}>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="div">
                        {item.name}
                    </Typography>
                    <Typography variant="body2">
                        {item.description}
                    </Typography>
                    <Typography variant="body2">
                        {item.time} - {item.end_recurrence}
                    </Typography>
                </CardContent>
                <CardActions align="center" alignItems="center" justifyContent="center">
                </CardActions>
            </Card>
            </Grid>
        ))}
        </Grid>
        </Container>
        

    )


}
export default ClassList