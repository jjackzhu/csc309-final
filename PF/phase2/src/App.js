import React from 'react';
import './App.css';
import Subplans from "./components/Subscriptions/Subplans";
import Card from "./components/Subscriptions/Card";
import UserPlan from "./components/Subscriptions/UserPlan";
import PaymentHistory from "./components/Subscriptions/PaymentHistory";
import subAPIContext, {useSubAPIContext} from "./components/Subscriptions/Contexts/APIContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SignUp from "./componentsSal/SignUp";
import LogIn from "./componentsSal/Login";
import Edit from "./componentsSal/Edit";
import Dashboard from "./componentsSal/Classes";
import APIContext, {useAPIContext} from "./contextsSal/APIContext";
import {MuiNavbar} from "./components/Navbar"

import Search from './studios/Search';
import APIContextStudios, {useAPIContextStudios} from "./studios/Context/StudioContext";
import StudioInfo from './studios/StudioInfo';

const theme = createTheme({
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
  const classes = (
    <APIContext.Provider value={useAPIContext()}>
        <Dashboard />
    </APIContext.Provider>
  )
    const edit = (
        <APIContext.Provider value={useAPIContext()}>
            <Edit />
        </APIContext.Provider>
    )

   const studios = (
        <APIContextStudios.Provider value={useAPIContextStudios()}>
            <Search />
        </APIContextStudios.Provider>
    )



  return (
    <ThemeProvider theme={theme}>
      <MuiNavbar/>
      <BrowserRouter>
        <subAPIContext.Provider value={useSubAPIContext()}>
          <Routes>
              <Route path="/">
                  <Route path="subscriptions/my_card" element={<Card />} />
                  <Route path="subscriptions/" element={<Subplans />} />
                  <Route path="subscriptions/my_plan" element={ <UserPlan />} />
                  <Route path="my_payments/" element={<PaymentHistory />} />
                  <Route index element={<SignUp />} />
                  <Route path="login" element={<LogIn />} />
                  <Route path="classes" element={classes} />
                  <Route path="edit" element={edit} />
                  <Route path="search" element={studios} />
                  <Route path="studios/:studio_id/info" element={<StudioInfo />} />
              </Route>
          </Routes>
        </subAPIContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
