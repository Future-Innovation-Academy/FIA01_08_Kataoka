import React from 'react';
import './App.css';
import {useNavigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import {useState,useEffect} from "react";
import Routers from './Routers';

  function App() {

    return (
      <div class="top-icon">
        <a href="/">Musy</a>
        <div className="router">
          <Routers/>
        </div>
      </div>
    );

  }


export default App;