import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { Link, Outlet } from 'react-router-dom';

export default function MakeAppointmentForm() {
  return (
    <Container className="MakeAppointmentForm">
      
      <Row>
        <Form >
              {/* <Col>
                  
                  <Form.Group className="mb-3" controlId="formLocation">
                    <Form.Label></Form.Label>
                    <Form.Control onChange={handleLocation} type="text" name="city" value={location} placeholder="Enter your current location" />
                    <Form.Text className="text-muted">
                      We'll search for vets in the area you specify.
                    </Form.Text>
                  </Form.Group>    
            
              </Col>
              <Col>
          
                  <Form.Group className="mb-3" controlId="formDistance">
                    <Form.Label></Form.Label>
                    <Form.Control onChange={handleDistance} type="text" name="distance" value={distance} placeholder="Specify distance in meters to current location" />
                    <Form.Text className="text-muted">
                      We'll search for vets in this radius of your current location.
                    </Form.Text>
                  </Form.Group>    
          
              </Col> */}
              <Col>
                <Button variant="primary" type="submit">
                    Save
                </Button>
              </Col>
        </Form> 
      </Row>
    </Container>
  )
}
