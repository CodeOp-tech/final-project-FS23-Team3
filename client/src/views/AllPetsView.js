import React, { useState, useEffect } from "react";
import AllPetsList from "../components/AllPetsList.js";
import AddPetForm from "../components/AddPetForm.js";
import Table from 'react-bootstrap/Table';

export default function AllPetsView(props) {
  
    // useEffect(() => {
    //   getPets();
    // }, []);


 return (
    <div>
        <h1>All pets</h1>

        <AllPetsList 
            user={props.user}
        />

        <AddPetForm 
            user = {props.user}
        />

    </div>
 );

}
