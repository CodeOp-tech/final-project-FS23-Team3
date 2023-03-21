import React, { useState, useEffect } from "react";
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";

import AddPetForm from "./AddPetForm";

export default function FeaturedPet(props) {
    const [showForm, setShowForm] = useState(false);
    const [editedPet, setEditedPet] = useState(null);


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
                </div>
            
            <Link to="/add-appointment" className="btn btn-primary">Add appointment info</Link>

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