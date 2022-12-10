import {useContext} from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import APIContext from "../../Contexts/APIContext";

export default function PaymentTable() {
  const { payments } = useContext(APIContext);

  var currentTime = new Date();

  var payment_lst = []
  payments.map((payment, index) => {
    payment_lst.push(payment)
  })
    
  return (
    <>
    <Container disableGutters maxWidth='lg' component="main" sx={{ pt: 8, pb: 1 }}>
        <Typography
          component="h1"
          variant="h4"
          align="left"
          color="text.primary"
          gutterBottom
        >
          Payments
        </Typography>
        <Typography variant="h6" align="left" color="text.secondary" component="p">
          All unpaid payments will be made on the specified date, unless the subscription plan is cancelled.
        </Typography>
    </Container>
    <Container disableGutters maxWidth='lg' component="main" sx={{ pt: 8, pb: 6 }}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Card Number</TableCell>
            <TableCell align="right">Paid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payment_lst.map((payment) => (
            <TableRow
              key={payment.date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {payment.date}
              </TableCell>
              <TableCell align="right">{payment.amount}</TableCell>
              <TableCell align="right">{payment.card_num}</TableCell>
              <TableCell align="right">{new Date(payment.date).getTime() <= new Date(currentTime).getTime() ? <CheckCircleIcon color='success'/> : <CancelIcon color='error'/>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    </>
  );
}