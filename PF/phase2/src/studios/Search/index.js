

import {useState, useContext, useEffect, useRef} from "react";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField'
import APIContext from "../Context/StudioContext";
import StudioList from "../StudioList";


/*
import {useState} from "react";

const buttons = [
    {title: '7', color: 'darkgrey'},
    {title: '8', color: 'darkgrey'},
    {title: '9', color: 'darkgrey'},
    {title: '/', color: 'orange'},
    {title: '4', color: 'darkgrey'},
    {title: '5', color: 'darkgrey'},
    {title: '6', color: 'darkgrey'},
    {title: '*', color: 'orange'},
    {title: '1', color: 'darkgrey'},
    {title: '2', color: 'darkgrey'},
    {title: '3', color: 'darkgrey'},
    {title: '-', color: 'orange'},
    {title: '0', color: 'darkgrey'},
    {title: '.', color: 'darkgrey'},
    {title: '=', color: 'orange'},
    {title: '+', color: 'orange'},
]

const Search = () => {

    const [value, setValue] = useState("");

    const click = (title) => {
        if (title === "=")
            setValue(eval(value))
        else
            setValue(value + title)
    }

    return (
        <div className="container">
            <input value={value} readOnly/>
            {buttons.map(({title, color}) => (
                <button
                    key={title}
                    onClick={() => click(title)}
                    style={{background: color}}
                >
                    {title}
                </button>
            ))}
        </div>
    )

}

export default Search;
*/

/*
import {useContext, useEffect, useState} from "react";
import APIContext from "../../studios/Context";
import Button from "@mui/material/Button";

const Search = () => {
    const perPage = 20;
    const [params, setParams] = useState({page: 1, search: ""})

    const { setPlayers } = useContext(APIContext);

    useEffect(() => {
        const { page, search } = params;
        fetch(`https://www.balldontlie.io/api/v1/players?page=${page}&per_page=${perPage}&search=${search}`)
            .then(res => res.json())
            .then(json => {
                setPlayers(json.data);
            })
    }, [params])

    return (
        <>
            Search
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
            <Button onClick={() => setParams({
                ...params,
                page: Math.max(1, params.page - 1)
            })}>
                prev
            </Button>
            <button onClick={() => setParams({
                ...params,
                page: params.page + 1
            })}>
                next
            </button>
        </>
    )
}

export default Search;

*/




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
        Submit
    </Button>

</form>
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



