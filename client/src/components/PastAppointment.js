import React, { useState } from 'react'
import AddAppointmentForm from './AddAppointmentForm';
import AppointmentSummary from './AppointmentSummary';
import Api from '../helpers/Api';

export default function PastAppointment(props) {
    const [formViewToggle, setFormViewToggle] = useState(true);
    const [appointmentSummary, setApptSummary] = useState({});

    async function addAppointmentInfo(appointmentObj) {
        let date = appointmentObj.date.slice(0,10);
        let id = appointmentObj.PetId;
        let myresponse = await Api.getContent(`/appointments/${id}/${date}`);
        if (myresponse.ok){
          if (myresponse.data.length === 1){
            let apptId = myresponse.data[0].id;
            let myresponse2 = await Api.changeAppointment(apptId, appointmentObj);
            setApptSummary(myresponse2.data);
          } else {
            let myresponse1 = await Api.addAppointment(appointmentObj);
            if (myresponse1.ok){
              setApptSummary(myresponse1.data)
            }
          }
        } else {
          console.log(`Error! ${myresponse.error}`)
        }
      }

      // async function 

      async function addNewAppointment(newAppt){
        let myresponse = await Api.addAppointment(newAppt);
        if (myresponse.ok){
          return
        } else {
          console.log(`Error! ${myresponse.error}`)
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
                addAppointmentCb={appointment => addAppointmentInfo(appointment)}
                addNewAppointmentCb={newAppt => addNewAppointment(newAppt)}
                />
            : <AppointmentSummary pets={props.pets} appointment={appointmentSummary}/>
        }
    </div>
  )
}
