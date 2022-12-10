

import {useState, useContext, useEffect, useRef} from "react";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import APIContext from "../Context/StudioContext";
import StudioList from "../StudioList";
import Map from "../Map";
import { Typography } from "@mui/material";
import Paper from '@mui/material/Paper';

import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';



const Search = () => {
    const { studios, setStudios } = useContext(APIContext);
    const [inputs, setInputs] = useState({streetNum: "", streetName: "",  studio_names: "", amenities: ""});
    const [params, setParams] = useState({page: 1, address: ""})
    const [next, setNext] = useState()
    const [error, setError] = useState( {message: "", display: "none"})

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        setInputs(values => ({
            ...values,
            [name]: target.value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const { streetNum, streetName, studio_names, amenities } = inputs;
        var a = streetNum + " " + streetName + " Toronto ON CA"
        //setAddress(a);
        setParams({
            page: 1,
            address: a
        })
        //console.log(a)
        //console.log(params.address)
        //console.log("HELLOOO")
    }


    const initialRender = useRef(0);
    useEffect(() => {
        if (initialRender.current < 2) {
            initialRender.current += 1;
          } else if (params.address) {
            //console.log(params.address)

        const { streetNum, streetName, studio_names, amenities } = inputs;
        const formData  = new FormData();
        formData.append("address", params.address);

        fetch(`http://127.0.0.1:8000/studios/map/?studio_names=${studio_names}&amenities=${amenities}&page=${params.page}`,
        {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(json => {
            if (json.error) {
                //setMessage({message: json.error,
                    //colour: "red"})
                    setError({
                        message: json.error,
                        display: ""
                    })
                }
            else{
                //setMessage({message: "Enter an address",
                    //colour: "white"})
                    setError({
                        message: "",
                        display: "none"
                    })

            }
            setStudios(json.results);
            setNext(json.next)
        })
    }
    }, [params])


    /*useEffect(() => {
        const { streetNum, streetName, studio_names, amenities } = inputs;
        var address = streetNum + " " + streetName + " Toronto ON CA";
        const formData  = new FormData();
        formData.append("address", address);
        fetch(`http://127.0.0.1:8000/studios/map/?studio_names=${studio_names}&amenities=${amenities}&page=${page.num}`,
        {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(json => {
                setStudios(json.studios);
            })
        }, [page]) */



return (error &&

<>
<Paper
        sx={{
          position: 'relative',
          backgroundColor: '#fa991c',
          color: '#fff',
          m: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
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

<form onSubmit={handleSubmit}>
<Container  sx={{
                position: 'relative',
                p: { xs: 3, md: 1 },
                pr: { md: 0 },
              }}
              maxWidth="md" align="center" alignItems="center" justifyContent="center">

    <Typography component="h1" variant="h1" color="inherit" gutterBottom align="center">
        Search
        <Typography component="h5" variant="h6" color="inherit" gutterBottom align="center">
        Find studios near you
        </Typography>
    </Typography>
    <Alert severity="error" sx={{display: error.display}}> {error.message} </Alert>

    <Typography
        component="h1"
        variant="h5"
    align="center"
    sx={{
        position: 'relative',
        p: { xs: 3, md: 1 },
        pr: { md: 0 },
      }}
    >
        Enter an address
    </Typography>



    <TextField
          required
          name="streetNum"
          id="outlined-required"
          label="Street #"
          value={inputs.streetNum}
          onChange={handleInputChange}
          fullWidth={true}
          sx={{
            position: 'relative',
            p: { xs: 3, md: 1 },
            pr: { md: 0 },
            width: 100
          }}
    />

    <TextField
          required
          name="streetName"
          id="outlined-required"
          label="Street Name"
          value={inputs.streetName}
          onChange={handleInputChange}
          sx={{
            position: 'relative',
            p: { xs: 3, md: 1 },
            pr: { md: 0 },
            width: 300
          }}
    />

    <TextField
        name="amenities"
        id="outlined-basic"
        label="Amenities"
        value={inputs.amenities}
        onChange={handleInputChange}
        sx={{
            position: 'relative',
            p: { xs: 3, md: 1 },
            pr: { md: 0 },
            width: 150
          }}
    />

    <TextField
        name="studio_names"
        id="outlined-basic"
        label="Studio Name"
        value={inputs.studio_names}
        onChange={handleInputChange}
        sx={{
            position: 'relative',
            p: { xs: 3, md: 1 },
            pr: { md: 0 },
            width: 150
          }}
    />
    <br></br>
    <Button type="submit">
        Search
    </Button>
    </Container>

</form>






            </Box>
          </Grid>
        </Grid>
      </Paper>




{studios && (
<StudioList address={params.address} />
)}

<Container maxWidth="md" align="center" alignItems="center" justifyContent="center">
<Button onClick={() => setParams({
                    ...params,
                page: Math.max(1, params.page - 1)
            })}>
                    Prev
            </Button>

            <Button onClick={() => next ? (setParams({
                ...params,
                page: params.page + 1
            }) ): ""}>
                    Next
            </Button>
        </Container>

</>
)

}

export default Search;



