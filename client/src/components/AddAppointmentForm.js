import React, { useState } from 'react';
import "./AddAppointmentForm.css";
import Api from '../helpers/Api';

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
  const [formInput, setFormInput] = useState(EMPTY_FORM);
  const [apptSummary, setApptSummary] = useState({});
  const [selected, setSelected] = useState("");
  const [submittedForm, setSubmittedForm] = useState(null);

  async function addAppointmentInfo(formInput) {
    let myresponse = await Api.addAppointment(formInput);
    if (myresponse.ok){
      setApptSummary(myresponse.data)
    } else {
      console.log(`Error! ${myresponse.error}`)
    }
  }

const handleChange = (event) => {
  let { name, value } = event.target;
  let apptObj = {...formInput};
  apptObj[name] = value;
  setSelected(apptObj.PetId);
  setFormInput(formInput => apptObj)
}

const handleSubmit = (event) => {
  event.preventDefault();
  addAppointmentInfo(formInput);
  setSubmittedForm(formInput);
  setFormInput(EMPTY_FORM);
}

  return (
    <div className="AddAppointmentForm">
      {!submittedForm && 
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
      }
      {submittedForm &&
      <div>
        <h1>Your appointment:</h1>
        <div className="submitted">        
          <div>
            <p>Date:</p>
            <p>{submittedForm.date}</p>
          </div>
          <div>
            <p>Vet clinic name:</p>
            <p>{submittedForm.clinicName}</p>
          </div>
          <div>
            <p>Which pet?</p>
            <p>{(props.pets.find(p => +p.id === +submittedForm.PetId)) ? (props.pets.find(p => +p.id === +submittedForm.PetId)).name : ''}</p>
          </div>
          <div>
            <p>Next steps for owner:</p>
            <p>{submittedForm.date}</p>
          </div>
          <div>
            <p>Complete next steps by:</p>
            <p>{submittedForm.nextSteps}</p>
          </div>
          <div>
            <p>Follow up appointment:</p>
            <p>{submittedForm.followups}</p>
          </div>
          <div>
            <p>Appointment topic:</p>
            <p>{submittedForm.title}</p>
          </div>
          <div>
            <p>Appointment summary:</p>
            <p>{submittedForm.summary}</p>
          </div>
        </div>
      </div>
      }
    </div>
  )
}
