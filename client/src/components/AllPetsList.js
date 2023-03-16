import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";

import FeaturedPet from "./FeaturedPet";
import AddPetForm from "./AddPetForm";


export default function AllPetsList(props) {

    const [pets, setPets] = useState([]);
    const [featPetId, setFeatPetId] = useState("");
    const [featPet,setFeatPet] = useState(null);
    const [formState, setFormState] = useState(false);

    const navigate = useNavigate();

    useEffect (() => {
        getPets();
    }, []);

    //hides or shows the form
    function showForm() {
        setFormState(!formState)
    }

    //hides the featured pet
    function handleHide() {
        setFeatPetId("");
        setFeatPet(null);
    }

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
        setFeatPetId(id);
        setFeatPet (pets.find(p => p.id === id));
    }

    return (
        <Table>
            {/* List of all pets  */}
            <tbody>
                {pets.map( p => (
                    <tr key = {p.id}>
                        <td>
                            {p.name}
                        </td>
                        <td>
                        {p.id === featPetId ?
                            <Button
                                onClick={e => handleHide()}
                                title="view"
                                type="button"
                                >
                                hide
                            </Button>
                            :
                            <Button
                                onClick={e => handleClick(p.id)}
                                title="view"
                                type="button"
                                >
                                veiw
                            </Button> }
                        </td>
                    </tr>
                ))}
            
            </tbody>
            
            {/* Featured pet component*/}
            { featPet &&
            <tbody>
                <FeaturedPet 
                    featPetId = {featPetId} //sending
                    featPet = {featPet} //sending
                    setFeatPet={setFeatPet}
                    getPets = {getPets} //sending
                />
            </tbody>
            }

            {/* Add new pet component*/}
            <tbody>
                Add new pet
                <Button onClick = { e=> showForm()}>
                    {
                        formState ? "-"
                        : "+"
                    }
                </Button>

                {formState && 
                <AddPetForm
                    user={props.user}
                    setFormState = {setFormState}
                    getPets={getPets}
                />}

            </tbody>

        </Table>
    );
    }