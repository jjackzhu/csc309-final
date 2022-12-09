import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ImageCarousel({images}) {

    return (images ? (
        <Carousel width="500px" height="400px" infiniteLoop dynamicHeight={false} >
            {images ? images.map((item, index) => (
            <div height="300px" width="300px">
            <img width="auto" height="auto" src={`${item.image}`} />
            </div>
            )) : <></>}
    </Carousel>

    ) : <></>)

  }

 
  
  export default ImageCarousel;