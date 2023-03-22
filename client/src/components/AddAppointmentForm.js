import React, { useState } from 'react';
import "./AddAppointmentForm.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EMPTY_FORM = {
  date: '',
  title: '',
  ClinicId:'',
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

function handleFileChange(e) {
  const file = e.target.files[0];
  setFormInput(formInput => ({ ...formInput, files: file}));
}

const handleSubmit = (event) => {
  event.preventDefault();
  if (formInput.completeBy === ''){
    formInput.completeBy = null;
  }
  if (formInput.followups === ''){
    formInput.followups = null;
  }

  const formData = new FormData();
  for (const [key, value] of Object.entries(formInput)) {
    console.log(key, value)
    formData.append(key, value);
  }

  if (props.addAppointmentCb){
    console.log(formData)
    props.addAppointmentCb(formData);
  }
  if (props.addNewAppointmentCb && formInput.followups){
    let newAppt = {  
    date: formInput.followups,
    title: "Follow up",
    ClinicId:null,
    summary: null,
    nextSteps: null,
    completeBy: null,
    followups: null,
    PetId: formInput.PetId,
    files:null
    }
    props.addNewAppointmentCb(newAppt)
  }
  if (props.changeAppointmentCb){
    props.changeAppointmentCb(formData);
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
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>Date:</Form.Label>
              <Form.Control 
                type="date" 
                name="date"
                value={formInput.date}
                required
                onChange={e => handleChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formClinicId">
            <Form.Label>Clinic Name:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder= "Clinic name"
                name="ClinicId"
                value={formInput.ClinicId}
                onChange={e => handleChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPetId">
            <Form.Label>Which pet?</Form.Label>
            <Form.Select aria-label="Default select example" required name="PetId" onChange={handleChange}>
                <option>Choose a pet</option>
                {props.pets.map(p => (
                  <option key={p.id} value={p.id} >{p.name}</option>
                ))}
            </Form.Select>
          </Form.Group>
      
          <Form.Group className="mb-3" controlId="formNextSteps">
            <Form.Label>Next steps for owner:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ex: pick up medication"
                name="nextSteps"
                value={formInput.nextSteps}
                onChange={e => handleChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCompleteBy">
            <Form.Label>Complete next steps by:</Form.Label>
              <Form.Control 
                type="date" 
                name="completeBy"
                value={formInput.completeBy}
                onChange={e => handleChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formFollowups">
            <Form.Label>Follow up appointment:</Form.Label>
              <Form.Control 
                type="date" 
                name="followups"
                value={formInput.followups}
                onChange={e => handleChange(e)}/>
          </Form.Group>
          <Form.Group controlId="formTitle">
            <Form.Label>Appointment topic:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Check up"
                name="title"
                value={formInput.title}
                onChange={e => handleChange(e)}/>
          </Form.Group>
          <Form.Group className="text-area" controlId="formSummary">
            <Form.Label>Appointment summary:</Form.Label>
            <textarea name ="summary" value={formInput.summary} onChange={e => handleChange(e)}></textarea>
          </Form.Group>
          <Form.Group controlId="formTitle">
            <Form.Label>Related files:</Form.Label>
              <Form.Control 
                type="file" 
                name="files"
                onChange={e => handleFileChange(e)}/>
          </Form.Group>
          <div className="span-3-cols">
            <Button variant="primary" type="submit">Submit</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
