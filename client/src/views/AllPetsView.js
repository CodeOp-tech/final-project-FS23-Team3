import React, { useState, useEffect } from "react";
import AllPetsList from "../components/AllPetsList.js";
import AddPetForm from "../components/AddPetForm.js";
import Table from 'react-bootstrap/Table';

export default function AllPetsView(props) {
    const [showForm, setShowForm] = useState(false);
  
    // useEffect(() => {
    //   getPets();
    // }, []);
    function handleClick() {
        setShowForm(true)
    }


 return (
    <div>
        <h1>All pets</h1>

        <AllPetsList 
            user={props.user}
        />
        {!showForm && <button onClick = {handleClick}>Add new pet</button>}
        {showForm && <AddPetForm user = {props.user}/>}

    </div>
 );

}
