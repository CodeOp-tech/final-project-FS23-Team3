import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import AddPetForm from "./AddPetForm";

export default function FeaturedPet(props) {
   //const [featPet,setFeatPet] = useState(props.featPet || null);
    const [showForm, setShowForm] = useState(false);
    const [editedPet, setEditedPet] = useState(null);

    // useEffect(() => {
    //     findPet();
    // }, []);

    function handleEditClick() {
        setEditedPet(props.featPet);
        setShowForm(true)
    }

    // const findPet = async () => {
    //     try{

    //       let response = await fetch(`/api/pets/${props.featPetId}`);
  
    //       if (response.ok) {
    //         let pet = await response.json();
    //         setFeatPet(pet);

    //       } else {
    //         console.log(`Server error: ${response.status} ${response.statusText}`);
    //       }
    //     } catch (err) {
    //       console.log(`Server Error`);
    //     }
    // }
  

    // function handleDelete(id) {
    //     const deletePet = async (data) => {
    //         try {
    //           let options = {
    //             method: "PATCH",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(data),
    //           };
      
    //           let response = await fetch(`/api/pets/${props.featPet.id}`, options);
      
    //           if (response.ok) {
    //             //Not sure what we want to do here yet, if anything
    //           } else {
    //             console.log(`Server error: ${response.status} ${response.statusText}`);
    //           }
    //         } catch (err) {
    //           console.log(`Server Error`);
    //         }
    //       };
    // }

    return(
        <div>
        {props.featPet && !showForm ?
        <div>
                <div>
                    <h2>{props.featPet.name}</h2>
                    <p>Type: {props.featPet.type}</p>
                    <p>Age: {props.featPet.age}</p>
                    <p>Breed: {props.featPet.breed}</p>
                </div>
            
            <Button>
                Add appointment
            </Button>

            <Button 
                onClick= {e => handleEditClick()}
            >
                Edit animal
            </Button>

            <Button variant="danger"
                // onClick= {e => handleDelete(fp.id)}
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