import logo from './logo.svg';
import './App.css';
import SignUp from "./componentsSal/SignUp";
import LogIn from "./componentsSal/Login";
import Edit from "./componentsSal/Edit";
import Dashboard from "./componentsSal/Classes";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import APIContext, {useAPIContext} from "./contextsSal/APIContext";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Search from './studios/Search';
import Layout from './Layout';
import APIContext, {useAPIContext} from "./studios/Context/StudioContext";
import StudioInfo from './studios/StudioInfo';

function App() {

    const studios = (
        <APIContext.Provider value={useAPIContext()}>
            <Search />
        </APIContext.Provider>
    )

    const classes = (
        <APIContext.Provider value={useAPIContext()}>
            <Dashboard />
        </APIContext.Provider>
    )
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" >
             <Route index element={<SignUp />} />
              <Route path="studios" element={studios} />
              <Route path="studios/:studio_id/info" element={<StudioInfo />} />
              <Route path="login" element={<LogIn />} />
              <Route path="classes" element={classes} />
              <Route path="edit" element={<Edit/>} />
            </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App;
