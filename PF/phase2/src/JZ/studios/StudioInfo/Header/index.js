import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Header({studio, address}) {
  /*
  
    return (
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(https://retailinsider.b-cdn.net/wp-content/uploads/2020/05/Gym-Equipment-Weights.jpeg)`
        }}
      >
      {<img style={{ display: 'none' }} src={"https://retailinsider.b-cdn.net/wp-content/uploads/2020/05/Gym-Equipment-Weights.jpeg"} alt={"header"} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                {studio.name}
                {"HELLO"}
              </Typography>
              
            </Box>
          </Grid>
        </Grid>
      </Paper>
    );
    */

    return (
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          m: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(https://retailinsider.b-cdn.net/wp-content/uploads/2020/05/Gym-Equipment-Weights.jpeg)`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: 'none' }} src={"https://retailinsider.b-cdn.net/wp-content/uploads/2020/05/Gym-Equipment-Weights.jpeg"} alt={"header"} />}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Grid container alignItems="center"
          justifyContent="center"
          >
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
              alignItems="center"
            >
              <Typography component="h1" variant="h1" color="inherit" gutterBottom align="center">
                {`${studio.name}`}
              </Typography>
              <Box
         direction="column"
         display="flex" 
         align="center" alignItems="center" justifyContent="center"
        >
          <Container maxWidth="sm">
            
          <Paper width="100px" elevation={0} sx={{ p: 2, bgcolor: '#ffff'}}>
          <Typography variant="h6" align="center" color="text.secondary">
            <b>Address</b>
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            {studio.address}
            </Typography>

            <Typography variant="h6" align="center" color="text.secondary">
            <b>Postal Code</b>
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            {studio.postal_code}
            </Typography>

            <Typography variant="h6" align="center" color="text.secondary">
            <b>Phone Number</b>
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            {studio.phone_number}
            </Typography>
            <Stack
              sx={{ pt: 1 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              
              <a href={`https://www.google.com/maps/dir/?api=1&origin=${address}&destination=${studio.latitude},${studio.longitude}`} target="_blank" rel="noreferrer">
              <Button variant="contained">Get Directions</Button>
              </a>
              <Button variant="outlined">View Classes</Button>
            </Stack>



            </Paper>

          
          </Container>
        </Box>

            </Box>
          </Grid>
        </Grid>
      </Paper>
    );
  }

 
  
  export default Header;