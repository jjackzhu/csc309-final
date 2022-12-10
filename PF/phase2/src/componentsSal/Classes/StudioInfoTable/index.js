import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useContext} from "react";
import APIContext from "../../../contextsSal/APIContext";
import axios from "axios";


// function createData(username, studio, name, time) {
//     return { username, studio, name, time};
// }

const History = () => {
    const { studios } = useContext(APIContext);
    const HandleClick = (event) => {
        event.preventDefault();
        let studio_num = event.target.innerHTML
        axios.get(`http://localhost:8000/classes/${studio_num}/info/`)
            .then((res) => {
                console.log(res)
            })
    }
    return (
        <>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell >Studio ID</TableCell>
                        <TableCell >Studio Name</TableCell>
                        <TableCell >Studio Address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {studios.map((obj) => (
                        <TableRow
                            key={obj.id + obj.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell onClick={HandleClick}>{obj.id}</TableCell>
                            <TableCell >{obj.name}</TableCell>
                            <TableCell>{obj.address}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default History;