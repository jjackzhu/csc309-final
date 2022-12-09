import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';


function Header({studio}) {
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

            </Box>
          </Grid>
        </Grid>
      </Paper>
    );
  }

 
  
  export default Header;