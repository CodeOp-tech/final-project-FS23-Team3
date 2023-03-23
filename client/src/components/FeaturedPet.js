import React, { useState, useEffect } from "react";
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";
import Api from "../helpers/Api";
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
    const [showForm, setShowForm] = useState(false);
    const [editedPet, setEditedPet] = useState(null);
    const[nextAppointment, setNextAppointment] = useState([]);

    useEffect(() => {
      getAppointments();
    }, [props.featPet.id])


    function handleEditClick() {
        setEditedPet(props.featPet);
        setShowForm(true)
    }
  

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
        {props.featPet && !showForm ?
        <div>
                <div>
                    {/* <CloseButton /> */}
                    <h2>{props.featPet.name}</h2>
                    <Image src={props.featPet.img_url} alt={props.featPet.name}/>
                    <p>Type: {props.featPet.type}</p>
                    <p>Age: {props.featPet.age}</p>
                    {nextAppointment ? nextAppointment.date && 
                      <p>Next appointment: {toDate(nextAppointment.date)}</p>
                      : <p>No upcoming appointments</p>
                    }
                </div>
            
             <Dropdown>
              <Dropdown.Toggle variant="primary" className="btn btn-primary">
                Add Appointment
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/add-appointment" className="btn btn-primary">Add past appointment</Dropdown.Item>
                <Dropdown.Item href="/clinics" className="btn btn-primary">Add new appointment</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Link to={`/appointments/${props.featPet.id}`} className="btn btn-primary">View {props.featPet.name}'s appointments</Link>

            <Button 
                onClick= {e => handleEditClick()}
            >
                Edit animal
            </Button>

            <Button variant="danger"
                onClick= {e => handleDelete(props.featPet.id)}
                >Delete animal
            </Button>
        </div>
        :
        <AddPetForm
            editedPet = {editedPet}
            setEditedPet = {setEditedPet}
            setFeatPet = {props.setFeatPet}
            featPet = {props.featPet}
            setShowForm = {setShowForm}
            getPets = {props.getPets}

        />
        
        }
        </div>
    )
}