import React, { useState, useEffect } from "react";
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";
import Api from "../helpers/Api";

import "./FeaturedPet.css"
import Dropdown from 'react-bootstrap/Dropdown';

import AddPetForm from "./AddPetForm";

let toDate = (date) => {
  let dateFormatted = date.split(/[- :.T]/).slice(0, -4).join(', ');
  let dateObj = new Date(dateFormatted);
  let month = new Intl.DateTimeFormat("en-US", {month:"long"}).format(dateObj);
  let day = dateObj.getUTCDate() + 1;
  let year = dateObj.getUTCFullYear();
  return (`${month} ${day}, ${year}`);
}

export default function FeaturedPet(props) {
    const [editedPet, setEditedPet] = useState(null);
    const [nextAppointment, setNextAppointment] = useState([]);

    useEffect(() => {
      getAppointments();
    }, [props.featPet.id])


    function handleEditClick() {
        setEditedPet(props.featPet);
    }
  
    //deletes a pet from the database
    async function handleDelete(id) {
    
        try {
          let options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          };
      
          let response = await fetch(`/api/pets/${props.featPet.id}`, options);
      
          if (response.ok) {
            props.getPets();
            props.setFeatPet(null);
          } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
          }
        } catch (err) {
          console.log(`Server Error`);
        }

    }

    async function getAppointments(){
      let myresponse = await Api.getContent('/appointments/future');
      if (myresponse.ok){
          let appointments = myresponse.data;
          appointments=appointments.filter(a => a.PetId === props.featPet.id);
          setNextAppointment(appointments[0])
      } else {
          console.log(`Error! ${myresponse.error}`);
      }
  }

    return(
        <div>
        

        <div>
            <Offcanvas show={props.featPet || props.editedPet} onHide= {e=>props.handleHide()} id = "FeatPetOffcanvasWhole">

              <Offcanvas.Header closeButton >
                <Offcanvas.Title id="FeatPetOffcanvasTitle">{props.featPet.name}
                </Offcanvas.Title>
              </Offcanvas.Header>

                {!editedPet ?
                <Offcanvas.Body id="FeatPetBody" className="FeatPetOffcanvas">
                        <Image src={props.featPet.img_url} alt={props.featPet.name} id="FeatPetImage"/>
                        <p><strong>Type:</strong> {props.featPet.type}</p>
                        <p><strong>Age:</strong> {props.featPet.age}</p>
                        {nextAppointment ? nextAppointment.date && 
                        <p>Next appointment: {toDate(nextAppointment.date)}</p>
                        : <p>No upcoming appointments</p>
                        }

                        <Link to="/add-appointment" className="btn btn-primary">Add appointment info</Link>

                        <Link to={`/appointments/${props.featPet.id}`} className="btn btn-primary">View {props.featPet.name}'s appointments</Link>

                        <Button 
                            onClick= {e => handleEditClick()}
                        >
                            Edit animal
                        </Button>

                        <Button id="delete-button"
                            onClick= {e => handleDelete(props.featPet.id)}
                            >Delete animal
                        </Button>
                </Offcanvas.Body>
                :
                <Offcanvas.Body>
                    <AddPetForm
                        editedPet = {editedPet}
                        setEditedPet = {setEditedPet}
                        setFeatPet = {props.setFeatPet}
                        featPet = {props.featPet}
                        getPets = {props.getPets}
                        handleHide = {props.handleHide}
                    />
                </Offcanvas.Body>
             }

            </Offcanvas>
            
        </div>
        </div>
    )
}