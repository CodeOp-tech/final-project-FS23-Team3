import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";

import AddPetForm from "./AddPetForm";

export default function FeaturedPet(props) {
    const [editPet, setEditPet] = useState(false);

    let fp = props.featPet;

    function handleEditClick() {
        //props.setEditedPet(fp);
        setEditPet(true)
    }

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
        <div className = "FeatPet">
        {props.featPet && !editPet ?
        <div>
                <div>
                    <h2>{fp.name}</h2>
                    <p>Type: {fp.type}</p>
                    <p>Age: {fp.age}</p>
                    <p>Breed: {fp.breed}</p>
                </div>

            <button 
                onClick= {e => handleEditClick()}
            >
                Edit animal
            </button>

            <button
                // onClick= {e => handleDelete(fp.id)}
                >Delete animal
            </button>
        </div>
        :
        <AddPetForm/>
        
        }
        </div>
    )
}