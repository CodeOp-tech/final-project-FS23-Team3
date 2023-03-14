import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';


export default function AllPetsList(props) {

    const [pets, setPets] = useState([]);
    // const [editingId, setEditingId] = useState(null);
    // const [editedPet,setEditedPet] = useState(null);

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

    //saves the ID of the pet we want to edit and finds the information for that pet
    // async function handleEditClick(id) {
    //     setEditingId(id);
    //     setEditedPet(props.pets.find((c) => c.id === id));
    // }

    return (
        <Table>
            <tbody>
                {pets.map( p => (
                    <tr key = {p.id}>
                        <td>
                            {p.name}
                        </td>
                    </tr>
                ))}
            </tbody>

        </Table>
    );
    }