import React from 'react';
import { Link } from "react-router-dom";
import "./HomeView.css";
import UrgentToDos from '../components/UrgentToDos';

export default function HomeView() {

  return (
    <div>
        <Link to="/to-dos" style={{ textDecoration: 'none', color:"black" }}>
            <UrgentToDos/>
        </Link> 

        <Link to="/add-appointment" style={{ textDecoration: 'none', color:"black" }}>
            <button>Add details about appointment</button>
        </Link> 
    </div>
  )
}
