import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';

// import Local from './helpers/Local';
// import Api from './helpers/Api';

import NavBar from './components/NavBar';
// import PrivateRoute from './components/PrivateRoute';
// import LoginView from './views/LoginView';
// import RegView from './views/RegView';
// import ErrorView from './views/ErrorView';
// import OwnersView from './views/UsersView';



function App() {
  const [owner, setOwner] = useState(Local.getOwner());


  function doLogout() {
    Local.removeUserInfo();
    setOwner(null);
    }


  return (
    <div className="App">
      <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossorigin="anonymous"
        />

      <NavBar owner={owner} logoutCb={doLogout} />

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
