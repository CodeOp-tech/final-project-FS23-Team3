import React, { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav'

import AllPetsList from "../components/AllPetsList.js";
import AddPetForm from "../components/AddPetForm.js";

export default function AllPetsView(props) {
    const [showForm, setShowForm] = useState(false);
  
    function handleClick() {
        setShowForm(!showForm)
    }


 return (
    <div>
        <h1>All pets</h1>

        <AllPetsList 
            user={props.user}
        />

    </div>
 );

}
