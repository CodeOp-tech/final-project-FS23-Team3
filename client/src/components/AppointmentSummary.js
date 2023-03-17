import React, { useState, useEffect } from 'react';
import Api from '../helpers/Api';
import AddAppointmentForm from './AddAppointmentForm';

export default function AppointmentSummary(props) {
    const [showForm, setShowForm] = useState(false);
    const [editedAppt, setEditedAppt] = useState(null);
    const [appointment, setAppointment] = useState(props.appointment);

    useEffect(() => {
        getAppointment();
    },[props.appointment.title])


    function handleEditClick() {
        setEditedAppt(props.appointment);
        setShowForm(true)
    }

    async function getAppointment(){
        let id = props.appointment.id;
        let myresponse = await Api.getOneAppointment(id);
        if (myresponse.ok){
            setAppointment(myresponse.data)
        } else {
            console.log(`Error! ${myresponse.error}`)
        }
    }

    async function changeAppointment(apptObj){
        let id = props.appointment.id;
        let myresponse = await Api.changeAppointment(id, apptObj);
        if (myresponse.ok){
            setAppointment(myresponse.data);
            setEditedAppt(myresponse.data);
        } else {
            console.log(`Error! ${myresponse.error}`)
        }
    }

  return (
    // <div>
    // {appointment && 
        <div>
        {!showForm ?
        <div>
        <div>
            <h1>Your appointment:</h1>
            <div className="submitted">        
                <div>
                    <p>Date:</p>
                    <p>{(props.appointment.date) ? props.appointment.date.slice(0,10) : props.appointment.date}</p>
                </div>
                <div>
                    <p>Vet clinic name:</p>
                    <p>{props.appointment.clinicName}</p>
                </div>
                <div>
                    <p>Which pet?</p>
                    <p>{(props.pets.find(p => +p.id === +props.appointment.PetId)) ? (props.pets.find(p => +p.id === +props.appointment.PetId)).name : ''}</p>
                </div>
                <div>
                    <p>Next steps for owner:</p>
                    <p>{props.appointment.nextSteps}</p>
                </div>
                <div>
                    <p>Complete next steps by:</p>
                    <p>{(props.appointment.completeBy) ? props.appointment.completeBy.slice(0,10) : props.appointment.completeBy}</p>
                </div>
                <div>
                    <p>Follow up appointment:</p>
                    <p>{(props.appointment.followups) ? props.appointment.followups.slice(0,10) : props.appointment.followups}</p>
                </div>
                <div>
                    <p>Appointment topic:</p>
                    <p>{props.appointment.title}</p>
                </div>
                <div>
                    <p>Appointment summary:</p>
                    <p>{props.appointment.summary}</p>
                </div>
            </div>
        </div>
        <button onClick= {e => handleEditClick()}>
            Edit appointment
        </button>
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
    // }
    // </div>
  )
}
