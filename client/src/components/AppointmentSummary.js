import React, { useState, useEffect } from 'react';
import Api from '../helpers/Api';
import AddAppointmentForm from './AddAppointmentForm';
import Button from 'react-bootstrap/esm/Button';

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

    function toggleShowForm(){
        setShowForm(showForm => !showForm)
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

    async function changeAppointment(formData){
        let id = props.appointment.id;
        let options = {
            method: "PUT",
            //headers: { "Content-Type": "application/json" },
            body: formData,
          };
  
          try {
              let response = await fetch(`/api/appointments/${id}`, options);
              if (response.ok) {
                let updatedAppt = await response.json();
                  setAppointment(updatedAppt);
                  setEditedAppt(updatedAppt);
                  console.log("Changed appointment:" + updatedAppt);
              } else {
              console.log(`Server error: ${response.status} ${response.statusText}`);
              }
          } catch (err) {
              console.log(`Server Error: ${err.message}`);
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
                    <p>{(props.clinics.find(c => +c.id === +appointment.ClinicId)) ? (props.clinics.find(c => +c.id === +appointment.ClinicId)).name : ''}</p>
                </div>
                <div>
                    <p>Which pet?</p>
                    <p>{(props.pets.find(p => +p.id === +appointment.PetId)) ? (props.pets.find(p => +p.id === +appointment.PetId)).name : ''}</p>
                </div>
                <div>
                    <p>Next steps for owner:</p>
                    <p>{props.appointment.nextSteps}</p>
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
                {appointment.files &&
                    <div>
                        <p>Appointment files:</p>
                        <a href={`http://localhost:5000/files/${appointment.files}`} target='_blank'>{appointment.files}</a>
                    </div>
                }
            </div>
        </div>
        <button onClick= {e => handleEditClick()}>
            Edit appointment
        </button>
        </div>
        :
        <div>
        <AddAppointmentForm
            editedAppt = {editedAppt}
            setEditedAppt = {setEditedAppt}
            setShowForm = {setShowForm}
            pets={props.pets}
            clinics={props.clinics}
            changeAppointmentCb={formData => changeAppointment(formData)}

        />
        <Button onClick={e => toggleShowForm()}>back</Button>
        </div>
        }
    </div>
    }
    </div>
  )
}
