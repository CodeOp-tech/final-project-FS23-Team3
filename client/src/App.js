import './App.css';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import Local from "./helpers/Local";
import Api from "./helpers/Api";

import LoginView from "./views/LoginView";
import PrivateRoute from './components/PrivateRoute';
import RegisterView from './views/RegisterView';
import NavBar from './components/NavBar';

function App() {
const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const navigate = useNavigate();

  async function doLogin(username, password) {
    let myresponse = await Api.loginUser(username, password);
    if (myresponse.ok){
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMsg('');
      navigate('/');
    } else {
      setLoginErrorMsg('Login failed');
    }
  }

  async function doLogout(){
    Local.removeUserInfo();
    setUser(null);
  }

  async function registerUser(firstname, lastname, username, email, password){
    let myresponse = await Api.registerUser(firstname, lastname, username, email, password);
    if (myresponse.ok){
      doLogin(username, password)
    } else {
      setLoginErrorMsg('Registration failed');
    }
  }


  return (
    <div className="App">
      <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossOrigin="anonymous"
        />

      <NavBar user={user} logoutCb={doLogout} />
      {!user && <Link to="/register">Create Account</Link>}

      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <h1>Home</h1>
          </PrivateRoute>
        } />
        <Route path='/login' element={<LoginView loginErrorMsg={loginErrorMsg} doLoginCb={(u, p) => doLogin(u, p)} />} />
        <Route path='/register' element={<RegisterView loginErrorMsg={loginErrorMsg} registerUserCb={(firstname, lastname, username, email, password) => registerUser(firstname, lastname, username, email, password)} />} />
      </Routes>
    </div>
  );
}

export default App;
