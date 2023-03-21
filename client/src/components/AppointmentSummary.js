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
    <div>
    {appointment && 
        <div>
        {!showForm ?
        <div>
        <div>
            <h1>Your appointment:</h1>
            <div className="submitted">        
                <div>
                    <p>Date:</p>
                    <p>{(appointment.date) ? appointment.date.slice(0,10) : appointment.date}</p>
                </div>
                <div>
                    <p>Vet clinic name:</p>
                    <p>{appointment.clinicName}</p>
                </div>
                <div>
                    <p>Which pet?</p>
                    <p>{(props.pets.find(p => +p.id === +appointment.PetId)) ? (props.pets.find(p => +p.id === +appointment.PetId)).name : ''}</p>
                </div>
                <div>
                    <p>Next steps for owner:</p>
                    <p>{appointment.nextSteps}</p>
                </div>
                <div>
                    <p>Complete next steps by:</p>
                    <p>{(appointment.completeBy) ? appointment.completeBy.slice(0,10) : appointment.completeBy}</p>
                </div>
                <div>
                    <p>Follow up appointment:</p>
                    <p>{(appointment.followups) ? appointment.followups.slice(0,10) : appointment.followups}</p>
                </div>
                <div>
                    <p>Appointment topic:</p>
                    <p>{appointment.title}</p>
                </div>
                <div>
                    <p>Appointment summary:</p>
                    <p>{appointment.summary}</p>
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
    }
    </div>
  )
}
