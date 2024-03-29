import React, { useState, useEffect } from "react";
import './AllPetsView.css';
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';

import AllPetsList from "../components/AllPetsList.js";

export default function AllPetsView(props) {

    useEffect(() => {
        props.getOwnerPetsCb();
    },[]);

 return (
    <div className = "AllPetsView">
        <h3>all pets</h3>
        <AllPetsList 
            user = {props.user}
        />

    </div>
 );

}
