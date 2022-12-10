import {useContext, useEffect, useState} from "react";
import APIContext from "../Context/StudioContext";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Map from "../Map";

const StudioList = (address) => {

    const { studios } = useContext(APIContext);


    // card code from https://mui.com/material-ui/react-card/
    return studios && (
        <>
        <Map address={address.address}/>
        <Container sx={{ py: 4 }} maxWidth="md">
        <Grid container spacing={4} align="center" alignItems="center" justifyContent="center">
            {studios.map((studio, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} key={index}>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {studio.distance}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {studio.name}
                    </Typography>
                    <Typography variant="body2">
                        {studio.address}
                    </Typography>
                </CardContent>
                <CardActions align="center" alignItems="center" justifyContent="center">
                    <Button size="small" align="center" alignItems="center" justifyContent="center" component={Link} to={`/studios/${studio.id}/info`} state={{"address": address}}>More Info</Button>
                </CardActions>
            </Card>
            </Grid>
        ))}
        </Grid>
        </Container>
        </>

    )


}
export default StudioList



/*

const Studios = () => {

    
    const [params, setParams] = useState({page: 1, studio_names: "", amenities: ""})

    const { setStudios } = useContext(APIContext);

    useEffect(() => {
        const { page, studio_names, amenities } = params;
        fetch(`http://127.0.0.1:8000/studios/map/?studio_names=${studio_names}&amenities=${amenities}&page=${page}`, 
        {
            method: 'GET',
            body: address,
        })
            .then(res => res.json())
            .then(json => {
                setStudios(json.data);
            })
    }, [params])

    
    return (
        <>
            Search

            <TextField
                name="amenities"
                id="outlined-basic"
                label="Amenities"
                value={inputs.streetNum}
                onChange={handleAmenityChange}
            />

            <TextField
                name="studio_names"
                id="outlined-basic"
                label="Studio Name"
                value={inputs.streetNum}
                onChange={handleStudioNameChange}
            />

            <input
                style={{width: 300, height: 20, fontSize: 18, margin: 4}}
                value={params.search}
                onChange={(event) => {
                    setParams({
                        search: event.target.value,
                        page: 1,
                    })
                }}
            />
            <PlayersTable perPage={perPage} params={params} />
            

            <Button onClick={() => setParams({
                ...params,
                page: Math.max(1, params.page - 1)
            })}>
                    Prev
            </Button>

            <Button onClick={() => setParams({
                ...params,
                page: params.page + 1
            })}>
                    Next
            </Button>
        </>
    ) // 
}

export default Studios; */


