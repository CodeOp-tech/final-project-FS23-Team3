import React, {useState, useContext} from 'react';
import { useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import PetContext from '../context/PetContext';

import Local from "../helpers/Local";
import './MakeAppointmentForm.css'

const EMPTY_FORM = {
    date: '',
    title: '',
    PetId: ''
  }

export default function MakeAppointmentForm(props) {
    const { id } = useParams();
    const pets = useContext(PetContext);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [appointment, setAppointment] = useState([])

   //handleForm add form input to create new appointment with PetId and ClinicId
   //add association between clinics and appointments: appt. has one clinic, clinic can have many appt.
    
   function handleChange(event) {
        let { name, value } = event.target;
        setFormData(data => ({...data, [name]: value}));
    }

    function handleSubmit(event) {
        event.preventDefault();
        addAppointment(formData);
        setFormData(EMPTY_FORM);
        
    }

   async function addAppointment(appointment) {
        let vet = props.vets.businesses.find(v => v.id === id);
        //has the user added this vet to favorites already (only then can appointments be amde)?
        //if not, add to myVets first, then make appointment
        let favorite = props.favoriteClinics.find(clinic => clinic.clinicKey === id)
        if (!favorite) {
          await props.handleAddFavoriteCb(vet)
        }
        
        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointment),
        }

        let token = Local.getToken();
                  if (token) {
                      options.headers['Authorization'] = 'Bearer ' + token;
                  }

        try {
            let response = await fetch (`/api/appointments/${vet.id}`, options);
            if (response.ok) {
                let appointment = await response.json();
                setAppointment(appointment);
            } else {
                console.log(`Server error: ${response.status} ${response.statusText}`);
            }
        } catch (err) {
            console.log(`Server Error: ${err.message}`);
        }
        
    }
  
   return (
    <Container className="MakeAppointmentForm">
      <Row>
        <Form onSubmit={handleSubmit}>
              <Row>
                  <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label></Form.Label>
                        <Form.Control   type="text" 
                                        name="title" 
                                        value={formData.title}
                                        placeholder="Enter title" 
                                        onChange={handleChange}/>
                    <Form.Text className="text-muted">
                      What is the purpose of this appointment?
                    </Form.Text>
                  </Form.Group>    
              </Row>

              <Row>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label></Form.Label>
                        <Form.Select aria-label="petDropdown"
                                    name="PetId"
                                    value={formData.PetId}
                                    onChange={handleChange}           
                            >
                            <option>Select a pet</option>
                            {
                                pets.map(p => (
                                    <option value={p.id}>{p.name}</option>
                                ))
                            }
                        </Form.Select> 
                    </Form.Group>
              </Row>

              <Row>
                    <Form.Group className="mb-3" controlId="formDate">
                    <Form.Control key="date" type="date" name= "date" value={formData.date} onChange={handleChange} />
                    </Form.Group> 
              </Row>

              <Row>
                <Button variant="primary" type="submit" onClick={props.handleCloseCb}>
                    Add appointment
                </Button>
              </Row>
        </Form> 
      </Row> 
    </Container>
  )
}
