import React from 'react';
import './App.css';
import Routers from './Routers';

  function App() {

    return (
      <div className="top-icon">
        <a href="/">Musy</a>
        <div className="router">
          <Routers/>
        </div>
      </div>
    );

  }


export default App;