import {useContext, useEffect, useState, useCallback, useRef} from "react";
import APIContext from "../Context/StudioContext";

import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {  useLoadScript } from '@react-google-maps/api';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import StudioInfo from "../StudioInfo";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const containerStyle = {
    width: '400px',
    height: '400px'
  };

const center = {
    lat: 43,
    lng: -79
  };

const Map = (address) => {

    const { studios } = useContext(APIContext);

    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB7ESJ4L1if7GVp-jZaaDYy8aaCNlKc_tw"
      })

    const [map, setMap] = useState()

    const ref = useRef(null);

    useEffect(() => {
    if (ref.current && !map) {
        setMap(new window.google.maps.Map(ref.current, {}));
    }
    }, [ref, map]);


    const [selectedMarker, setSelectedMarker] = useState({studio: null});
    



    // marker infoWindow code from https://medium.com/kirsten-werner/clickable-markers-in-a-google-maps-react-component-3e9a522e1fff
    return isLoaded ? (

      <Box
         direction="column"
         display="flex" 
         align="center" alignItems="center" justifyContent="center"
         width="700"
         height="500"
        >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          mapContainerClassName="map-container"
          zoom={10}
          mapContainerStyle={{
            width: '1000px',
            height: '500px'
          }}

        >
          { /* Child components, such as markers, info windows, etc. */ }
          {studios ? studios.map((studio, index) => (
              <Marker
              key={index}
              position={{lat: studio.latitude, lng: studio.longitude}} 
              onClick={() => {
                setSelectedMarker({studio: studio});
             }}
              />
          )) : <></>
        }

            {selectedMarker.studio && (
                 <InfoWindow
                 onCloseClick={() => {
                     setSelectedMarker({studio: null});
                 }}      
                 position={{
                     lat: selectedMarker.studio.latitude,
                     lng: selectedMarker.studio.longitude
                 }}> 
                 <div>
                 <h3>{selectedMarker.studio.name}</h3>
                 <h5>{selectedMarker.studio.address}, {selectedMarker.studio.postal_code}</h5>
                 <h5>{selectedMarker.studio.phone_number}</h5>
                 <Button size="small" component={Link} to={`/studios/${selectedMarker.studio.id}/info`} state={{"address": address}}>More Info</Button>
                 </div>
                 
             </InfoWindow>
             )}   


          <></>
        </GoogleMap>
        </Box>
    ) : <></>


}
export default Map