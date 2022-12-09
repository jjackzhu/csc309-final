import * as React from 'react';
import {useContext, useEffect, useState} from "react";

import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { useParams, useLocation} from "react-router-dom";
import Header from './Header';
import { yellow } from '@mui/material/colors';
import ImageCarousel from './ImageCarousel';
import ClassList from '../ClassSearch/ClassList';
import ClassSearch from '../ClassSearch';



const StudioInfo = () => {
    // const { setStudios } = useContext(APIContext);
    const { studio_id } = useParams()
    const [data, setData] = useState([])
    const [status, setStatus] = useState([]);

    const location = useLocation();
    //console.log(location.state)
   //var address = ""
    const address = location.state.address.address


    //address = address.replace(" ", '+');

    useEffect(() => {
      fetch(`http://127.0.0.1:8000/studios/${studio_id}/info/`)
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        //console.log("HELLO")
        setData(json)
      })
      .then(()=>setStatus('Success'))
      .catch(()=>setStatus('Error'));
    }, [])
/*
    useEffect(() => {
      document.body.style.backgroundColor = "#032539";
  }, []) */

    // const { studios } = useContext(APIContext);

    // altered template code from https://github.com/mui/material-ui/blob/v5.10.16/docs/data/material/getting-started/templates/album/Album.js

    return (
      <>
      {status === 'Success' && <>
      <main>
      <Header studio={data.studio} />
      </main>


         <Box
         direction="column"
         display="flex" 
         align="center" alignItems="center" justifyContent="center"
        >
          <Container maxWidth="sm">
            
          <Paper width="100px" elevation={0} sx={{ p: 1, bgcolor: '#fa991c'}}>
          <Typography variant="h6" align="center" color="text.secondary">
            <b>Address</b>
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            {data.studio.address}
            </Typography>

            <Typography variant="h6" align="center" color="text.secondary">
            <b>Postal Code</b>
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            {data.studio.postal_code}
            </Typography>

            <Typography variant="h6" align="center" color="text.secondary">
            <b>Phone Number</b>
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            {data.studio.phone_number}
            </Typography>
            </Paper>

            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              
              <a href={`https://www.google.com/maps/dir/?api=1&origin=${address}&destination=${data.studio.latitude},${data.studio.longitude}`} target="_blank" rel="noreferrer">
              <Button variant="contained">Get Directions</Button>
              </a>
              <Button variant="outlined">View Classes</Button>
            </Stack>
          </Container>
        </Box>

        <Container sx={{ py: 8 }} maxWidth="md" align="center" alignItems="center" justifyContent="center">
          
          <ImageCarousel images={data.images} />


            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            {data.amenities.map((item) => (
            <Chip label={`${item.type} x ${item.quantity}`} variant="outlined" align="center" />
            ))}

          </Stack>


        </Container>


        <ClassSearch studio_id={studio_id}/>


        </>
}
      
      </>

    )


}
export default StudioInfo