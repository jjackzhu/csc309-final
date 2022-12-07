import React from 'react';
import './App.css';
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
    
  return (
      <BrowserRouter>
          <Routes>
              <Route path="studios" element={studios} />
              <Route path="studios/:studio_id/info" element={<StudioInfo />} />
          </Routes>
      </BrowserRouter>
  )

}

export default App;
