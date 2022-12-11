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
import StudioInfoTable from "../../componentsSal/Classes/StudioInfoTable"


const StudioInfo = () => {
    const { studio_id } = useParams()
    const [data, setData] = useState([])
    const [status, setStatus] = useState([]);

    const location = useLocation();
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
      <Header studio={data.studio} address={address} />
      </main>


        <Container sx={{ py: 8 }} maxWidth="md" align="center" alignItems="center" justifyContent="center">



          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            {data.amenities.map((item) => (
            <Chip label={`${item.type} x ${item.quantity}`} variant="outlined" align="center" />
            ))}

          </Stack>


          <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3}>
              <Grid item xs={12} >
                 <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                   <StudioInfoTable studio_id={studio_id} />
                 </Paper>
               </Grid>
            </Grid>
          </Container>


          <ClassSearch studio_id={studio_id}/>

        </Container>

        <Container sx={{ py: 5 }} maxWidth="md" align="center" alignItems="center" justifyContent="center">
        <ImageCarousel images={data.images} />
      </Container>


        </>
}

      </>

    )


}
export default StudioInfo
