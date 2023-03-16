import React from 'react';
import { Link } from "react-router-dom";
import "./HomeView.css";
import UrgentToDos from '../components/UrgentToDos';
import AllPetsList from '../components/AllPetsList';
import VetDrawing from "../images/vet-image.svg";
import CalendarImage from "../images/calendar-image.svg";
import ChatImage from "../images/Chat-image.svg"

export default function HomeView(props) {

  return (
    <div className="HomeView">
      <div className="Main-home-items">
        <Link to="/to-dos" style={{ textDecoration: 'none', color:"black" }}>
            <UrgentToDos/>
        </Link> 
        <div>
          <Link to="/pets" style={{ textDecoration: 'none', color:"black" }}>
            <h1>My pets:</h1>
          </Link> 
          <AllPetsList user={props.user}/>
        </div>
      </div>
      <div className="home-cards">
        <div className="card" style={{width: "20rem"}}>
          <img src={VetDrawing} className="card-img-top" alt="drawing of veterinarians"/>
          <div className="card-body">
            <h5 className="card-title">Add Appointment Info</h5>
            <p className="card-text">Add information from a past vet visit to keep it in your records.</p>
            <Link to="/add-appointment" className="btn btn-primary">Add Information</Link>
          </div>
        </div>
        <div className="card" style={{width: "20rem"}}>
          <img src={CalendarImage} className="card-img-top" alt="drawing of calendar"/>
          <div className="card-body">
            <h5 className="card-title">Make an Appointment</h5>
            <p className="card-text">Find information for vets you've visited previously or search for a new vet in your area.</p>
            <Link to="/make-appointment" className="btn btn-primary">Make Appointment</Link>
          </div>
        </div>
        <div className="card" style={{width: "20rem"}}>
          <img src={ChatImage} className="card-img-top" alt="chat message drawing"/>
          <div className="card-body">
            <h5 className="card-title">Chat with Vet</h5>
            <p className="card-text">Start a chat conversation with your vet.</p>
            <Link to="/chat" className="btn btn-primary">Chat</Link>
          </div>
        </div>
      </div>
        
    </div>
  )
}
