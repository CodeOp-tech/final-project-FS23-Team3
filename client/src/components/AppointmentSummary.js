import React, { useState, useEffect } from 'react';
import Api from '../helpers/Api';
import AddAppointmentForm from './AddAppointmentForm';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/esm/Table';
import "./AppointmentSummary.css";

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
    <div className="AppointmentSummary">
    {appointment && 
        <div>
        {!showForm ?
        <div className="container">
        <div>
            <h2>Your appointment:</h2>
            <Table borderless= {true} bordered={ false } className="submitted">   
                <tbody>
                <tr>
                    <td className="bold-td">Date:</td>
                    <td className="bold-td">Vet clinic:</td>
                    <td className="bold-td">Which pet?</td>
                </tr>
                <tr>
                    <td>{(appointment.date) ? appointment.date.slice(0,10) : appointment.date}</td>
                    <td>{(props.clinics.find(c => +c.id === +appointment.ClinicId)) ? (props.clinics.find(c => +c.id === +appointment.ClinicId)).name : ''}</td>
                    <td>{(props.pets.find(p => +p.id === +appointment.PetId)) ? (props.pets.find(p => +p.id === +appointment.PetId)).name : ''}</td>
                </tr>
                <tr>
                    <td className="bold-td">Next steps for owner:</td>
                    <td className="bold-td">Complete next steps by:</td>
                    <td className="bold-td">Follow up appointment:</td>
                </tr>
                <tr>
                    <td>{props.appointment.nextSteps}</td>
                    <td>{(appointment.completeBy) ? appointment.completeBy.slice(0,10) : appointment.completeBy}</td>
                    <td>{(appointment.followups) ? appointment.followups.slice(0,10) : appointment.followups}</td>
                </tr>
               <tr>
                    <td className="bold-td">Appointment topic:</td>
                    <td className="bold-td">Appointment summary:</td>
                    <td className="bold-td">Appointment files:</td>
               </tr>
               <tr>
                    <td>{appointment.title}</td>
                    <td>{appointment.summary}</td>
                    <td>{appointment.files ? <a href={`http://localhost:5000/files/${appointment.files}`} target='_blank'>{appointment.files}</a> : ''}</td>
               </tr>
                </tbody>     
            </Table>
        </div>
        <Button  style={{marginLeft:"-25px"}} onClick= {e => handleEditClick()}>
            Edit appointment
        </Button>
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
        <Button style={{marginBottom:"10px"}} onClick={e => toggleShowForm()}>back</Button>
        </div>
        }
    </div>
    }
    </div>
  )
}
