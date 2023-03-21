import React, { useState } from 'react';
import "./AddAppointmentForm.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
  if (props.addNewAppointmentCb){
    let newAppt = {  
    date: formInput.followups,
    title: null,
    clinicName:null,
    summary: null,
    nextSteps: null,
    completeBy: null,
    followups: null,
    PetId: formInput.PetId}
    props.addNewAppointmentCb(newAppt)
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
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>Date:</Form.Label>
              <Form.Control 
                type="date" 
                name="date"
                value={formInput.date}
                onChange={e => handleChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formClinicName">
            <Form.Label>Clinic Name:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder= "Clinic name"
                name="clinicName"
                value={formInput.clinicName}
                onChange={e => handleChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPetId">
            <Form.Label>Which pet?</Form.Label>
            <Form.Select aria-label="Default select example" name="PetId" onChange={handleChange}>
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
          <div className="span-3-cols">
            <Button variant="primary" type="submit">Submit</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
