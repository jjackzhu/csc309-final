import './App.css';
import SignUp from "./componentsSal/SignUp";
import LogIn from "./componentsSal/Login";
import Edit from "./componentsSal/Edit";
import Dashboard from "./componentsSal/Classes";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import APIContext, {useAPIContext} from "./contextsSal/APIContext";


function App() {
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
              <Route path="login" element={<LogIn />} />
              <Route path="classes" element={classes} />
              <Route path="edit" element={<Edit/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App;
