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
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <subAPIContext.Provider value={useSubAPIContext()}>
          <Routes>
              <Route path="/">
                  <Route path="subscriptions/my_card" element={<Card />} />
                  <Route path="subscriptions/" element={<Subplans />} />
                  <Route path="subscriptions/my_plan" element={ <UserPlan />} />
                  <Route path="my_payments/" element={<PaymentHistory />} />
              </Route>
          </Routes>
        </subAPIContext.Provider>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;