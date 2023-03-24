import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Api from '../helpers/Api';
import "./AllPetAppointmentLog.css";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import AddAppointmentForm from './AddAppointmentForm';
import { Link } from "react-router-dom";

export default function AllPetAppointmentLog(props) {
    const [appointments, setAppointments] = useState([]);
    const { id } = useParams();
    const pet = props.pets.find((pet) => +pet.id === +id);
    const [showForm, setShowForm] = useState(false);
    const [editedAppt, setEditedAppt] = useState(null);
    const [appointment, setAppointment] = useState([]);

    useEffect(() => {
        getAppointments();
    }, [appointment]);

    useEffect(() =>{
        props.getOwnerClinicsCb();
    },[])


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

    function toggleShowForm(){
        setShowForm(showForm => !showForm)
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
        let myresponse = await Api.getContent(`/appointments/${id}/appointments`);
        if (myresponse.ok){
            let appointments = myresponse.data;
            appointments.sort(function(b,a){
                return new Date(a.date) - new Date(b.date);
              });
              setAppointments(appointments);
        } else {
            console.log(`Error! ${myresponse.error}`)
        }
    }

    async function changeAppointment(formData){
        let id = editedAppt.id;
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

    let toDate = (date) => {
        let dateFormatted = date.split(/[- :.T]/).slice(0, -4).join('');
        let dateNumber = +dateFormatted ;
        let dateString=dateNumber.toString();
        let dateReformatted = dateString.slice(0,4)+ "-"+dateString.slice(4,6)+"-"+dateString.slice(6,8)
        let dateObj = new Date(dateReformatted);
        let month = new Intl.DateTimeFormat("en-US", {month:"long"}).format(dateObj);
        let day = dateObj.getUTCDate() ;
        let year = dateObj.getUTCFullYear();
        return (`${month} ${day}, ${year}`);
    }

  return (
    <div className="AllPetAppointmentLog">
        {appointments.length > 0 ? 
        <div>

        {!showForm ?
        <div>
        <h2>{pet ? pet.name : ""}'s appointments:</h2>
        <div className="appt-log-grid" >
        {appointments.map(a => (
            <Alert className="log-alert" key={a.id}>
                <Alert.Heading style={{textDecoration:"underline"}}>{toDate(a.date)}</Alert.Heading>
                {a.title ? 
                <div>
                    <p style={{fontWeight:"bold"}} className="log-bold">Appointment topic:</p>
                <p>{a.title}</p>
                </div>
                : <p style={{fontWeight:"bold"}} className="log-bold">Upcoming appointment</p>
                }
                {a.ClinicId &&
                <div>
                    <p style={{fontWeight:"bold"}} className="log-bold">Vet Clinic:</p>
                    <p>{(props.clinics.find(c => +c.id === +a.ClinicId)) ? (props.clinics.find(c => +c.id === +a.ClinicId)).name : ''}</p>
                </div>
                }
                {a.summary &&
                <div>
                    <p style={{fontWeight:"bold"}} className="log-bold">Appointment summary:</p>
                    <p>{a.summary}</p>
                </div>
                }
                {a.nextSteps &&
                <div>
                    <p style={{fontWeight:"bold"}} className="log-bold">Next steps:</p>
                    <p>{a.nextSteps}</p>
                </div>
                }
                {a.files &&
                <div>
                    <p style={{fontWeight:"bold"}} className="log-bold">Files:</p>
                    <a href={a.file_url} target='_blank'>{a.files}</a>
                </div>
                }
                {a.followups &&
                <div>
                    <p style={{fontWeight:"bold"}} className="log-bold">Follow up appointment:</p>
                    <p>{toDate(a.followups)}</p>
                </div>
                }
                <Button onClick= {e => handleEditClick(a.id)} className= "btn position-absolute top-0 start-0" type="button"><i className="fa-regular fa-pen-to-square"></i></Button>
            </Alert>
        ))}
        </div>
        </div>
                :
                <div>
                <AddAppointmentForm
                    editedAppt = {editedAppt}
                    setEditedAppt = {setEditedAppt}
                    setShowForm = {setShowForm}
                    pets={props.pets}
                    clinics={props.clinics}
                    changeAppointmentCb={apptObj => changeAppointment(apptObj)}
        
                />
                <Button style={{marginBottom:"10px"}} onClick={e => toggleShowForm()}>back</Button>
                </div>
                }
        </div>
        : <div>
            <h1>No appointments yet</h1>
            <Link to={`/clinics`} className="btn btn-todos">Add new appointment</Link>
          </div>
        }
    </div>
  )
}
