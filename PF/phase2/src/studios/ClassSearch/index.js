
import {useState, useContext, useEffect, useRef} from "react";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField'
import ClassList from "./ClassList";
import Map from "../Map";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Container from '@mui/material/Container';
import { Typography } from "@mui/material";
import { useParams, useLocation} from "react-router-dom";
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';;



const ClassSearch = ({studio_id}) => {
    const [data, setData] = useState([])
    const [inputs, setInputs] = useState({class_names: "", coaches: "", start_date: null, end_date: null, start_time: null, end_time: null});
    //const [address, setAddress] = useState("")
    const [page, setPage] = useState(1)
    //const [params, setParams] = useState({page: 1, time_range: ""})
   //const [params, setParams] = useState({page: 1, address: ""})

    const handleInputChange = (event) => {

        const target = event.target;
        const name = target.name;
        setInputs({
            ...inputs,
            [name]: target.value
        });
       // console.log(inputs.target.name)
        //console.log(inputs)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //setAddress(a);
        setPage(1)
        fetchClasses()
    }

    const fetchClasses = () => {

        const { class_names, coaches, start_date, end_date, start_time, end_time } = inputs;
        if (start_date && end_date){
            var dates = start_date.toString() + "," + end_date.toString()
        }
        else{
            var dates = ""
        }

        if (start_time && end_time){
            var time_range = start_time.toString() + "," + end_time.toString()
        }
        else{
            var time_range = ""
        }

        fetch(`http://127.0.0.1:8000/studios/${studio_id}/class_search/?class_names=${class_names}&coaches=${coaches}&dates=${dates}&time_range=${time_range}&page=${page}`, 
        {   
            method: 'GET',
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            setData(json);
        })
    }

    const initialRender = useRef(0);
    useEffect(() => {
        if (initialRender.current < 2) {
            initialRender.current += 1;
          } else {
            fetchClasses()
    }
    }, [page])



return inputs && (
<>
<form onSubmit={handleSubmit}>
<Container  sx={{
                position: 'relative',
                p: { xs: 3, md: 1 },
                pr: { md: 0 },
              }}
              maxWidth="md" align="center" alignItems="center" justifyContent="center">

    <Typography component="h1" variant="h3" color="inherit" gutterBottom align="center">
        Search classes
    </Typography>

    <TextField
          name="class_names"
          id="outlined-basic"
          label="Class Name"
          value={inputs.class_names}
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
          name="coaches"
          id="outlined-basic"
          label="Coach name"
          value={inputs.coaches}
          onChange={handleInputChange}
          sx={{
            position: 'relative',
            p: { xs: 3, md: 1 },
            pr: { md: 0 },
            width: 300
          }}
    />
    <Container>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DesktopDatePicker
            name="start_date"
          label="Start Date"
          inputFormat="YYYY-MM-DD"
          value={inputs.start_date}
          onChange={(newValue) => {
            setInputs({
                ...inputs,
                start_date: newValue});
          }}
          renderInput={(params) => <TextField {...params} />}
        />
    <DesktopDatePicker
     name="end_date"
          label="End Date"
          inputFormat="YYYY-MM-DD"
          value={inputs.end_date}
          onChange={(newValue) => {
            setInputs({
                ...inputs,
                end_date: newValue});
          }}
          renderInput={(params) => <TextField {...params} />}
        />

    <TimePicker
     name="start_time"
          label="Start Time"
          value={inputs.start_time}
          onChange={(newValue) => {
            setInputs({
                ...inputs,
                start_time: newValue});
          }}
          renderInput={(params) => <TextField {...params} />}
        />

    <TimePicker
     name="end_time"
          label="End Time"
          value={inputs.end_time}
          onChange={(newValue) => {
            setInputs({
                ...inputs,
                end_time: newValue});
          }}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
    </Container>

    <br></br>

    <Button type="submit">
        Search
    </Button>
    </Container>

</form>


<ClassList classes={data.results}/>

<Container maxWidth="md" align="center" alignItems="center" justifyContent="center">
<Button onClick={() => setPage(Math.max(1, page - 1))}>
                    Prev
            </Button>

            <Button onClick={() => setPage(page + 1)}>
                    Next
            </Button>
</Container>
    
</>
)

}

export default ClassSearch;