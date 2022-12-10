import React from 'react';
import './App.css';
import Subplans from "./components/Subscriptions/Subplans";
import Card from "./components/Subscriptions/Card";
import UserPlan from "./components/Subscriptions/UserPlan";
import PaymentHistory from "./components/Subscriptions/PaymentHistory";
import subAPIContext, {useSubAPIContext} from "./components/Subscriptions/Contexts/APIContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  // typography: {
  //   "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
  //   "fontSize": 14,
  //   "fontWeightLight": 300,
  //   "fontWeightRegular": 400,
  //   "fontWeightMedium": 500
  //  },
  palette: {
    primary: {
      main: '#1C768F'
    },
    secondary: {
      main: '#FA991C'
    }
  }
});

function App() {
  // const subplans = (
  //   <subAPIContext.Provider value={useAPIContext()}>
  //       <Subplans />
  //   </subAPIContext.Provider>
  // )

  // const card = (
  //   <subAPIContext.Provider value={useAPIContext()}>
  //       <Card />
  //   </subAPIContext.Provider>
  // )
  // const userPlan = (
  //   <subAPIContext.Provider value={useAPIContext()}>
  //       <UserPlan />
  //   </subAPIContext.Provider>
  // )

  // const paymentHistory = (
  //   <subAPIContext.Provider value={useAPIContext()}>
  //       <PaymentHistory />
  //   </subAPIContext.Provider>
  // )

  return (
    <subAPIContext.Provider value={useSubAPIContext()}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route path="subscriptions/my_card" element={<Card />} />
                <Route path="subscriptions/" element={<Subplans />} />
                <Route path="subscriptions/my_plan" element={ <UserPlan />} />
                <Route path="my_payments/" element={<PaymentHistory />} />
            </Route>
        </Routes>
    </BrowserRouter>
    </ThemeProvider>
    </subAPIContext.Provider>
  )
}

export default App;