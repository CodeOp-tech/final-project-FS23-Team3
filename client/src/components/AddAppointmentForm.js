import React, { useState } from 'react';
import "./AddAppointmentForm.css";

const EMPTY_FORM = {
  date: '',
  title: '',
  clinicName:'',
  summary: '',
  nextSteps: '',
  completeBy: '',
  followups: '',
  PetId: ''
}

export default function AddAppointmentForm(props) {
  const [formInput, setFormInput] = useState(props.editedAppt || EMPTY_FORM);
  const [selected, setSelected] = useState("");

const handleChange = (event) => {
  let { name, value } = event.target;
  let apptObj = {...formInput};
  apptObj[name] = value;
  setSelected(apptObj.PetId);
  setFormInput(formInput => apptObj)
}

const handleSubmit = (event) => {
  event.preventDefault();
  if (props.addAppointmentCb){
    props.addAppointmentCb(formInput);
  }
  if (props.changeAppointmentCb){
    props.changeAppointmentCb(formInput);
  }
  if (props.setShowForm){
    props.setShowForm(false);
  }
  if(props.handleChangeCb){
    props.handleChangeCb()
  }
  setFormInput(EMPTY_FORM);
}

  return (
    <div className="AddAppointmentForm">
      {/* {!submittedForm &&  */}
      <div className="not-submitted">
      <h1>Add information about a past appointment</h1>
        <p id="required-astrisk">* signifies a required field</p>
        <form onSubmit={handleSubmit}>
            <label>
                Date: *
                <input 
                type="text"
                name="date"
                value={formInput.date}
                placeholder={Date()}
                onChange={e => handleChange(e)}
                required
                />
            </label>
            <label>
                Vet Clinic Name:
                <input 
                type="text"
                name="clinicName"
                value={formInput.clinicName}
                onChange={e => handleChange(e)}
                />
            </label>   
            <label>Which pet? *
            <select name="PetId" onChange={handleChange} required value={selected}>
              <option value="" disabled hidden>Choose a pet</option>
              {props.pets.map(p => (
                <option key={p.id} value={p.id} >{p.name}</option>
              ))}
            </select>
          </label>
            <label>
                Next steps for owner:
                <input 
                type="text"
                name="nextSteps"
                value={formInput.nextSteps}
                onChange={e => handleChange(e)}
                />
            </label>
            <label>
                Complete next steps by:
                <input 
                type="text"
                name="completeBy"
                value={formInput.completeBy}
                onChange={e => handleChange(e)}
                />
            </label>
            <label>
                Follow up appointment:
                <input 
                type="text"
                name="followups"
                value={formInput.followups}
                onChange={e => handleChange(e)}
                />
            </label>
            <label>
                Appointment topic: *
                <input 
                type="text"
                name="title"
                placeholder= "check up"
                value= {formInput.title}
                onChange={e => handleChange(e)}
                required
                />
            </label>
            <label className="text-area">
                Appointment summary: *
                <textarea name ="summary" value={formInput.summary} onChange={e => handleChange(e)}></textarea>
            </label>
            <div className="span-3-cols">
            <button type="submit">Submit</button>
            </div>
        </form>
      </div>
    </div>
  )
}
