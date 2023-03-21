import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Api from '../helpers/Api';
import "./AllPetAppointmentLog.css";
import Alert from 'react-bootstrap/Alert';

export default function AllPetAppointmentLog(props) {
    const [appointments, setAppointments] = useState([]);
    const { id } = useParams();
    const pet = props.pets.find((pet) => +pet.id === +id);

    useEffect(() => {
        getAppointments();
    }, [])

    async function getAppointments(){
        let myresponse = await Api.getOnePet(id);
        if (myresponse.ok){
            let appointments = myresponse.data.Appointments;
            appointments.sort(function(b,a){
                return new Date(a.date) - new Date(b.date);
              });
              setAppointments(appointments);
        } else {
            console.log(`Error! ${myresponse.error}`)
        }
    }

    let toDate = (date) => {
        let dateFormatted = date.split(/[- :.T]/).slice(0, -4).join(', ');
        let dateObj = new Date(dateFormatted);
        let month = new Intl.DateTimeFormat("en-US", {month:"long"}).format(dateObj);
        let day = dateObj.getUTCDate() + 1;
        let year = dateObj.getUTCFullYear();
        return (`${month} ${day}, ${year}`);
    }

  return (
    <div className="AllPetAppointmentLog">
        <h1>{pet ? pet.name : ""}'s Appointments:</h1>
        <div className="appt-log-grid" >
        {appointments.map(a => (
            <Alert variant="primary" key={a.id}>
                <Alert.Heading style={{textDecoration:"underline"}}>{toDate(a.date)}</Alert.Heading>
                {a.title ? 
                <div>
                    <p style={{fontWeight:"bold"}}>Appointment topic:</p>
                <p>{a.title}</p>
                </div>
                : <p style={{fontWeight:"bold"}}>Upcoming appointment</p>
                }
                {a.summary &&
                <div>
                    <p style={{fontWeight:"bold"}}>Appointment summary:</p>
                    <p>{a.summary}</p>
                </div>
                }
            </Alert>
        ))}
        </div>
    </div>
  )
}
