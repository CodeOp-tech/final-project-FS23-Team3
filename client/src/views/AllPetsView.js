import React, { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';

import AllPetsList from "../components/AllPetsList.js";
//import AddPetForm from "../components/AddPetForm.js";

export default function AllPetsView(props) {
    const [formState, setFormState] = useState(false); ///hides or shows the form and changes the look of the button


 return (
    <div>
        <h1>All pets</h1>

        <AllPetsList 
            user={props.user}
        />

    </div>
 );

}
