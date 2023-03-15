import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";

import FeaturedPet from "./FeaturedPet";
import AddPetForm from "./AddPetForm";


export default function AllPetsList(props) {

    const [pets, setPets] = useState([]);
    const [featId, setFeatId] = useState("");
    const [featPet,setFeatPet] = useState(null);
    const [editedPet, setEditedPet] = useState(null);
    const navigate = useNavigate();

    useEffect (() => {
        getPets();
    }, []);

    //getting all pets for this user
    async function getPets() {
        try {
            //will need to edit the URL here to include ID from the params
            let response = await fetch(`api/pets/${props.user.id}/pets/`);

            if (response.ok) {
              let pets = await response.json();
              setPets(pets);
    
            } else {
                console.log(`Server error: ${response.status} ${response.statusText}`);
            }
    
        } catch (err) {
            console.log(`Server error: ${err.message}`);
        }
    }

    // saves the ID of the pet we want to edit and finds the information for that pet
    function handleClick(id) {
        setFeatId(id);
        setFeatPet(pets.find((p) => p.id === id));
    }

    return (
        <Table>
            <tbody>
                {pets.map( p => (
                    <tr key = {p.id}>
                        <td>
                            {p.name}
                        </td>
                        <td>
                            <button
                                onClick={e => handleClick(p.id)}
                                title="view"
                                type="button"
                                >
                                veiw
                            </button>
                        </td>
                    </tr>
                ))}
            
            </tbody>
            
            { featPet &&
            <tbody>
                <FeaturedPet 
                    featPet = {featPet} //sending
                    editedPet = {editedPet} //receiving
                    setEditedPet = {setEditedPet}
                />
            </tbody>
            }
{/* 
            {
                editedPet &&
                <tbody>
                    <AddPetForm/>
                </tbody>
            } */}

            <tbody>
                <AddPetForm
                    editedPet = {editedPet} //sending
                />
            </tbody>

        </Table>
    );
    }