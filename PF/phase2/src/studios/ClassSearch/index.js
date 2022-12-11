
import {useState, useContext, useEffect, useRef} from "react";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField'
import ClassList from "./ClassList";
import Map from "../Map";
import moment from 'moment';
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
import Stack from '@mui/material/Stack';import { isSameDateError } from "@mui/x-date-pickers/internals/hooks/validation/useDateValidation";
import Alert from '@mui/material/Alert';
;



const ClassSearch = ({studio_id}) => {
    const [data, setData] = useState([])
    const [inputs, setInputs] = useState({class_names: "", coaches: "", start_date: null, end_date: null, start_time: null, end_time: null});
    //const [address, setAddress] = useState("")
    const [page, setPage] = useState(1)
    const [error, setError] = useState({message: "", display: "none"})
  
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
        const { class_names, coaches, start_date, end_date, start_time, end_time } = inputs;
        setPage(1)
        //setDisplay('none')
        //console.log(start_date)
        if (start_date && end_date){
          if (start_date.$y < end_date.$y){
            fetchClasses()
          }
          else if (start_date.$y == end_date.$y && start_date.$M < end_date.$M){
            fetchClasses()
          }
          else if (start_date.$y == end_date.$y && start_date.$M == end_date.$M && start_date.$D < end_date.$D){
            fetchClasses()
          }
         else{
           setError({message: "Please enter a end date later than the start date.", display: "visible"})
          }
          
      }
      fetchClasses()
    }

    const fetchClasses = () => {

        const { class_names, coaches, start_date, end_date, start_time, end_time } = inputs;
        setError({message: "", display: "none"})
        if (start_date && end_date){
            //console.log(start_date)
            var dates = moment(start_date.$d).format('YYYY-MM-DD') + "," + moment(end_date.$d).format('YYYY-MM-DD')
        }
        else{
            var dates = ""
        }

        if (start_time && end_time){
            var time_range = moment(start_time.$d).format('HH:mm') + "," + moment(end_time.$d).format('HH:mm')
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
    <Alert severity="error" sx={{display: error.display}}> {error.message} </Alert>

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
            width: 200
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
            width: 200
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
          renderInput={(params) => <TextField sx={{
            position: 'relative',
            p: { xs: 3, md: 1 },
            pr: { md: 0 },
            width: 200
          }}{...params} />}
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
          renderInput={(params) => <TextField sx={{
            position: 'relative',
            p: { xs: 3, md: 1 },
            pr: { md: 0 },
            width: 200
          }}
          {...params} />}
        />
    <br />
    <TimePicker
     name="start_time"
          label="Start Time Range"
          value={inputs.start_time}
          onChange={(newValue) => {
            setInputs({
                ...inputs,
                start_time: newValue});
          }}
          renderInput={(params) => <TextField sx={{
            position: 'relative',
            p: { xs: 3, md: 1 },
            pr: { md: 0 },
            width: 200
          }}
          {...params} />}
        />

    <TimePicker
     name="end_time"
          label="End Time Range"
          value={inputs.end_time}
          onChange={(newValue) => {
            setInputs({
                ...inputs,
                end_time: newValue});
          }}
          renderInput={(params) => <TextField sx={{
            position: 'relative',
            p: { xs: 3, md: 1 },
            pr: { md: 0 },
            width: 200
          }}
          {...params} />}
        />
    </LocalizationProvider>
    </Container>

    <br></br>

    <Button variant="contained" type="submit">
        Search
    </Button>
    </Container>

</form>


<ClassList classes={data.results} studio_id={studio_id}/>

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