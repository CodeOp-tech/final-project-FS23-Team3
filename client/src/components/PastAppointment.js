import React, { useState } from 'react'
import AddAppointmentForm from './AddAppointmentForm';
import AppointmentSummary from './AppointmentSummary';
import Api from '../helpers/Api';

export default function PastAppointment(props) {
    const [formViewToggle, setFormViewToggle] = useState(true);
    const [appointmentSummary, setApptSummary] = useState({});

    async function addAppointmentInfo(appointmentObj, formData) {
      console.log(appointmentObj, formData)
        let date = appointmentObj.date.slice(0,10);
        let id = appointmentObj.PetId;
        let myresponse = await Api.getContent(`/appointments/${id}/${date}`);
        if (myresponse.ok){
          if (myresponse.data.length === 1){
            let apptId = myresponse.data[0].id;

            let options = {
              method: "PUT",
              //headers: { "Content-Type": "application/json" },
              body: formData,
            };
    
            try {
                let response = await fetch(`/api/appointments/${apptId}`, options);
                if (response.ok) {
                  let updatedAppt = await response.json();
                    setApptSummary(updatedAppt)
                    console.log("Changed appointment:" + updatedAppt);
                } else {
                console.log(`Server error: ${response.status} ${response.statusText}`);
                }
            } catch (err) {
                console.log(`Server Error: ${err.message}`);
              }
          } else {
          console.log(appointmentObj);

          let options1 = {
            method: "POST",
            //headers: { "Content-Type": "application/json" },
            body: formData,
          };
  
          try {
              let response = await fetch(`/api/appointments`, options1);
              if (response.ok) {
                  let newAppt = await response.json();
                  setApptSummary(newAppt);
                  console.log("Changed appointment:" + newAppt);
              }
          } catch(err){
            console.log(`Server Error: ${err.message}`);
          }
        } 
      }else {
        console.log(`Error! ${myresponse.error}`)
      }
    }

      async function addNewAppointment(newAppt){
        let options = {
          method: "POST",
          //headers: { "Content-Type": "application/json" },
          body: newAppt,
        };

        try {
            let response = await fetch(`/api/appointments`, options);
            if (response.ok) {
                return
            }
        } catch(err){
          console.log(`Server Error: ${err.message}`);
        }
      }

    const handleChangeView = () => {
        setFormViewToggle(false);
      };

  return (
    <div>
       {
          (formViewToggle)
            ? <AddAppointmentForm 
                pets={props.pets} 
                handleChangeCb={e => handleChangeView()}
                addAppointmentCb={(appointment, formData)=> addAppointmentInfo(appointment, formData)}
                addNewAppointmentCb={newAppt => addNewAppointment(newAppt)}
                />
            : <AppointmentSummary pets={props.pets} appointment={appointmentSummary}/>
        }
    </div>
  )
}
