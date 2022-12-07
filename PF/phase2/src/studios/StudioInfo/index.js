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
import { Link } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { useParams, useLocation} from "react-router-dom";
import Header from './Header';



const StudioInfo = () => {
    // const { setStudios } = useContext(APIContext);
    const { studio_id } = useParams()
    const [data, setData] = useState([])
    const [status, setStatus] = useState([]);

    const location = useLocation();
    //console.log(location.state)
   //var address = ""
    const address = location.state.address.address
    console.log(address)
    console.log("HELLO")
    //address = address.replace(" ", '+');

    useEffect(() => {
      fetch(`http://127.0.0.1:8000/studios/${studio_id}/info/`)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        console.log("HELLO")
        setData(json)
      })
      .then(()=>setStatus('Success'))
      .catch(()=>setStatus('Error'));
    }, [])

    // const { studios } = useContext(APIContext);

    // altered template code from https://github.com/mui/material-ui/blob/v5.10.16/docs/data/material/getting-started/templates/album/Album.js


    return (
      <>
      {status === 'Success' && <>
      <Header studio={data.studio} />
         <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {data.studio.name}
            </Typography>

            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            {data.studio.address}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            {data.studio.postal_code}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            {data.studio.phone_number}
            </Typography>

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

        <Container sx={{ py: 8 }} maxWidth="md">
          
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {data.images.map((item) => (
            <ImageListItem key={item.image}>
            <img
                src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                loading="lazy"
            />
            </ImageListItem>
            ))}
            </ImageList>

        </Container>
        </>
}
      
      </>

    )


}
export default StudioInfo