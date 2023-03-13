import React, { useState } from "react";
import NewCollabForm from "./NewCollabForm";
import Table from 'react-bootstrap/Table';
import "./CollabList.css";

export default function AllPetsList(props) {

    const [pets, setPets] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editedPet,setEditedPet] = useState(null);

    //getting all pets for this user
    async function getPets() {
        try {
            //will need to edit the URL here to include ID from the params
            let response = await fetch('/:id/pets');

            if (response.ok) {
              let data = await response.json();
              setPets(data);
    
            } else {
                console.log(`Server error: ${response.status} ${response.statusText}`);
            }
    
        } catch (err) {
            console.log(`Server error: ${err.message}`);
        }
    }

    //saves the ID of the pet we want to edit and finds the information for that pet
    async function handleEditClick(id) {
        setEditingId(id);
        setEditedCollab(props.pets.find((c) => c.id === id));
    }

    return (
        <Table>
            <tbody>
                {props.pets.map( p => (
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