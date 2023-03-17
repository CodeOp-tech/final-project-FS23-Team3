import React, { useState } from 'react'
import AddAppointmentForm from './AddAppointmentForm';
import AppointmentSummary from './AppointmentSummary';
import Api from '../helpers/Api';

export default function PastAppointment(props) {
    const [formViewToggle, setFormViewToggle] = useState(true);
    const [appointmentSummary, setApptSummary] = useState({});

    async function addAppointmentInfo(appointmentObj) {
        let myresponse = await Api.addAppointment(appointmentObj);
        if (myresponse.ok){
          setApptSummary(myresponse.data)
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
                addAppointmentCb={appointment => addAppointmentInfo(appointment)}/>
            : <AppointmentSummary pets={props.pets} appointment={appointmentSummary}/>
        }
    </div>
  )
}
