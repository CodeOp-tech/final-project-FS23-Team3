import './App.css';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Local from "./helpers/Local";
import Api from "./helpers/Api";

import LoginView from "./views/LoginView";
import PrivateRoute from './components/PrivateRoute';
import RegisterView from './views/RegisterView';
import NavBar from './components/navbar';
import AllPetsView from "./views/AllPetsView";
import AddPetForm from "./components/AddPetForm";
import AllClinicsView from "./views/AllClinicsView"
import ClinicView from "./views/ClinicView"
import ToDosView from './views/ToDosView';
import HomeView from './views/HomeView';
import AddAppointmentForm from './components/AddAppointmentForm';
import PetContext from './context/PetContext';
import OwnerContext from './context/OwnerContext';
import PastAppointment from './components/PastAppointment';
import AllPetAppointmentLog from './components/AllPetAppointmentLog';
import MyVetsView from "./views/MyVetsView";


function App() {

  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [myVets, setMyVets] = useState ([]);
  const [clinics, setClinics] = useState([])

  

  useEffect(() => {
    if(user){
      getOwnerPets();
    }
  },[user]);

  useEffect(()=> {
    getOwnerClinics();
  },[])

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

  async function getOwnerClinics(){
    let id = user.id;
    let myresponse = await Api.getContent(`/clinics/${id}/clinics`);
    if (myresponse.ok){
      setClinics(myresponse.data);
    } else {
      console.log(`Error! ${myresponse.error}`)
    }
  }

    async function doLogout(){
      Local.removeUserInfo();
      setUser(null);
    }

  async function registerUser(firstname, lastname, username, email, password){
    let myresponse = await Api.registerUser(firstname, lastname, username, email, password);
    if (myresponse.ok){
      doLogin(username, password);
    } else {
      setLoginErrorMsg('Registration failed');
    }
  }

  async function getOwnerPets() {
    let id = user.id;
    let myresponse = await Api.getOwnerPets(id);
    if (myresponse.ok){
      setPets(myresponse.data)
    } else {
      console.log(`Error! ${myresponse.error}`)
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


        <Routes>

              <Route path="/" element={
                <PrivateRoute>
                  <HomeView user={user}/>
                </PrivateRoute>
              } />

                  <Route path= "/pets" element={
                      <PrivateRoute>
                          <AllPetsView 
                            user= {user} 
                            getOwnerPetsCb={e => getOwnerPets()}
                          />
                      </PrivateRoute>
                    } 
                  />

              <Route path= "/addpets" element={
                <PrivateRoute>
                  <AddPetForm 
                    user= {user} 
                    getOwnerPetsCb={e => getOwnerPets()}
                  />
                </PrivateRoute>
                } 
              />

                  <Route path="/clinics" element={
                    <PrivateRoute>
                      <AllClinicsView 
                        user = { user }
                      />
                    </PrivateRoute>
                    }
                  >
                          <Route path=':id' element={
                            <PrivateRoute>
                                <OwnerContext.Provider value={user} >
                                <PetContext.Provider value={pets} >
                                  <ClinicView 
                                    getOwnerPetsCb={e => getOwnerPets()}/>
                                </PetContext.Provider>
                                </OwnerContext.Provider>
                            </PrivateRoute>
                            } 
                          />
                  </Route>

              <Route path="/to-dos" element={
                    <PrivateRoute>
                      <ToDosView getOwnerClinicsCb={e=> getOwnerClinics()} pets={pets} user={user} clinics={clinics}/>
                    </PrivateRoute>
              } />

              <Route path="/myvets" element={
                    <PrivateRoute>
                      <OwnerContext.Provider value={user} >
                      <PetContext.Provider value={pets} >
                        <MyVetsView getOwnerPetsCb={e => getOwnerPets()}/>
                      </PetContext.Provider>
                      </OwnerContext.Provider>
                    </PrivateRoute>
              } />

              <Route path="/myvets/:id" element={
                    <PrivateRoute>
                      <OwnerContext.Provider value={user} >
                      <PetContext.Provider value={pets} >
                        <MyVetsView />
                      </PetContext.Provider>
                      </OwnerContext.Provider>
                    </PrivateRoute>
              } />

              <Route path='/login' element={
                    <LoginView loginErrorMsg={loginErrorMsg} doLoginCb={(u, p) => doLogin(u, p)} />
              } />
                  
              <Route path='/register' element={
              
              <RegisterView loginErrorMsg={loginErrorMsg} registerUserCb={(firstname, lastname, username, email, password) => registerUser(firstname, lastname, username, email, password)} />} />
        


        <Route path="/add-appointment" element={
          <PrivateRoute>
            <PastAppointment pets={pets} user={user} clinics={clinics}/>
          </PrivateRoute>
        } />

        <Route path="/appointments/:id" element={
          <PrivateRoute>
            <AllPetAppointmentLog getOwnerClinicsCb={e=> getOwnerClinics()} user={user} pets={pets} clinics={clinics}/>
          </PrivateRoute>
        } />

        </Routes>

      </div>
    );
  }

export default App;
