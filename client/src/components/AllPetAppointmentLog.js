import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Api from '../helpers/Api';
import "./AllPetAppointmentLog.css";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import AddAppointmentForm from './AddAppointmentForm';

export default function AllPetAppointmentLog(props) {
    const [appointments, setAppointments] = useState([]);
    const { id } = useParams();
    const pet = props.pets.find((pet) => +pet.id === +id);
    const [showForm, setShowForm] = useState(false);
    const [editedAppt, setEditedAppt] = useState(null);
    const [appointment, setAppointment] = useState([ ]);

    useEffect(() => {
        getAppointments();
    }, []);

    // useEffect(() => {
    //     getAppointment();
    // },[appointment.title])


    function handleEditClick(id) {
        let selectedApt = appointments.find(a => a.id === id);
        for (let key in selectedApt){
            if (selectedApt[key] === null){
                selectedApt[key] = ""
            }
        }
        setEditedAppt(selectedApt);
        setShowForm(true)
    }

    // async function getAppointment(){
    //     let id = props.appointment.id;
    //     let myresponse = await Api.getOneAppointment(id);
    //     if (myresponse.ok){
    //         setAppointment(myresponse.data)
    //     } else {
    //         console.log(`Error! ${myresponse.error}`)
    //     }
    // }

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

    async function changeAppointment(apptObj){
        let id = editedAppt.id;
        let myresponse = await Api.changeAppointment(id, apptObj);
        if (myresponse.ok){
            setAppointment(myresponse.data);
            setEditedAppt(myresponse.data);
            getAppointments();
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
        {appointments.length > 0 ? 
        <div>
        <h1>{pet ? pet.name : ""}'s Appointments:</h1>
        {!showForm ?
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
                <Button onClick= {e => handleEditClick(a.id)} className= "btn position-absolute top-0 start-0" type="button"><i className="fa-regular fa-pen-to-square"></i></Button>
            </Alert>
        ))}
        </div>
                :
                <AddAppointmentForm
                    editedAppt = {editedAppt}
                    setEditedAppt = {setEditedAppt}
                    setShowForm = {setShowForm}
                    pets={props.pets}
                    changeAppointmentCb={apptObj => changeAppointment(apptObj)}
        
                />
                }
        </div>
        : <h1>No appointments yet</h1>
        }
    </div>
  )
}
