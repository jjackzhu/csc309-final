

import {useState, useContext, useEffect, useRef} from "react";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField'
import APIContext from "../Context/StudioContext";
import StudioList from "../StudioList";
import Map from "../Map";



const Search = () => {
    const { setStudios } = useContext(APIContext);
    const [inputs, setInputs] = useState({streetNum: "", streetName: "",  studio_names: "", amenities: ""});
    //const [address, setAddress] = useState("")
    //const [page, setPage] = useState({num: 1})
    const [params, setParams] = useState({page: 1, address: ""})

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
          } else {
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
            setStudios(json);
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



return (
<>
<form onSubmit={handleSubmit}>
    <TextField
          required
          name="streetNum"
          id="outlined-required"
          label="Street Number"
          value={inputs.streetNum}
          onChange={handleInputChange}
    />

    <TextField
          required
          name="streetName"
          id="outlined-required"
          label="Street Name"
          value={inputs.streetName}
          onChange={handleInputChange}
    />

    <TextField
        name="amenities"
        id="outlined-basic"
        label="Amenities"
        value={inputs.amenities}
        onChange={handleInputChange}
    />

    <TextField
        name="studio_names"
        id="outlined-basic"
        label="Studio Name"
        value={inputs.studio_names}
        onChange={handleInputChange}
    />

    <Button type="submit">
        Search
    </Button>

</form>

<Map address={params.address}/>

<StudioList address={params.address} />
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
)

}

export default Search;



