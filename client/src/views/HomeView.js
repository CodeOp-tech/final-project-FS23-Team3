import React from 'react';
import { Link } from "react-router-dom";
import "./HomeView.css";
import UrgentToDos from '../components/UrgentToDos';
import VetDrawing from "../images/vet-image.svg";
import CalendarImage from "../images/calendar-image.svg";
import PetImage from "../images/undraw_dog.svg";
import Dropdown from 'react-bootstrap/Dropdown';

export default function HomeView(props) {

  return (
    <div className="HomeView">
      <div className="Main-home-items">


        <Link to="/to-dos" style={{ textDecoration: 'none', color:"black" }}>
            <UrgentToDos user={props.user}/>
        </Link> 

      </div>

      <div className="home-cards">
        <div className="card" style={{width: "20rem"}}>
          <img src={CalendarImage} className="card-img-top" alt="drawing of veterinarians"/>
          <div className="card-body">
            <h5 className="card-title">Appointments</h5>
            <p className="card-text">Add information from a past vet visit to keep it in your records.</p>
            <Dropdown>
              <Dropdown.Toggle variant="primary" className="btn btn-primary">
                Appointments
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/add-appointment" className="btn btn-primary">Add past appointment</Dropdown.Item>
                <Dropdown.Item href="/myvets" className="btn btn-primary">Add new appointment</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="card" style={{width: "20rem"}}>
          <img src={PetImage} className="card-img-top" alt="drawing of calendar"/>
          <div className="card-body">
            <h5 className="card-title">Pets</h5>
            <p className="card-text">Keep all your pet's health information stored in their profile.</p>
            <Dropdown>
              <Dropdown.Toggle variant="primary" className="btn btn-primary">
                Pets
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/pets" className="btn btn-primary">All pets</Dropdown.Item>
                <Dropdown.Item href="/to-dos" className="btn btn-primary">To do's</Dropdown.Item>
                <Dropdown.Item href="/addpets" className="btn btn-primary">Add new pet</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="card" style={{width: "20rem"}}>
          <img src={VetDrawing} className="card-img-top" alt="drawing of calendar"/>
          <div className="card-body">
            <h5 className="card-title">Vets</h5>
            <p className="card-text">Find information for vets you've visited previously or search for a new vet in your area.</p>
            <Dropdown>
              <Dropdown.Toggle variant="primary" className="btn btn-primary">
                Vets
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/clinics" className="btn btn-primary">Find a vet</Dropdown.Item>
                <Dropdown.Item href="/myvets" className="btn btn-primary">Saved vets</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
        
    </div>
  )
}
