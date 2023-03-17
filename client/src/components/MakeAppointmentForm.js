import React, {useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { Link, Outlet } from 'react-router-dom';
import PetContext from '../context/PetContext';


export default function MakeAppointmentForm() {
    const pets = useContext(PetContext);
    
  return (
    <Container className="MakeAppointmentForm">
      <Row>
        <Form >
              <Row>
                  <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label></Form.Label>
                    <Form.Control type="text" name="title" placeholder="Enter purpose of appointment." />
                    <Form.Text className="text-muted">
                      What is the purpose of this appointment?
                    </Form.Text>
                  </Form.Group>    
              </Row>

              <Row>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label></Form.Label>
                        {/* <Form.Control onChange={handlePet} name="pet" value={pet} /> */}
                        <Form.Select aria-label="petDropdown">
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
                    <Form.Control key="date" type="date" name= "date"  />
                    </Form.Group> 
              </Row>

              <Row>
                <Button variant="primary" type="submit">
                    Add appointment to to-do's
                </Button>
              </Row>
        </Form> 
      </Row> 
    </Container>
  )
}
