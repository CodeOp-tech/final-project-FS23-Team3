import './App.css';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import Local from "./helpers/Local";
import Api from "./helpers/Api";

import LoginView from "./views/LoginView";
import PrivateRoute from './components/PrivateRoute';
// import RegisterView from "./views/RegisterView"


function App() {
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const navigate = useNavigate();

  async function doLogin(username, password) {
    console.log(username, password)
    let myresponse = await Api.loginUser(username, password);
    console.log(myresponse.data)
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
    navigate('/');
  }

  async function registerUser(username, password){
    let myresponse = await Api.registerUser(username, password);
    if (myresponse.ok){
      doLogin(username, password);
    } else {
      setLoginErrorMsg('Registration failed');
    }
  }


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <h1>Home</h1>
          </PrivateRoute>
        } />
        <Route path='/login' element={<LoginView loginErrorMsg={loginErrorMsg} doLoginCb={(u, p) => doLogin(u, p)} />} />
        {/* <Route path='/register' element={<RegisterView loginErrorMsg={loginErrorMsg} doRegisterCb={(u, p) => registerUser(u, p)} />} /> */}
      </Routes>
    </div>
  );
}

export default App;
