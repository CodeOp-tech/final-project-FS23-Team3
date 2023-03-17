import React, { useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import MakeAppointmentForm from "../components/MakeAppointmentForm.js";
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { Link, Outlet } from 'react-router-dom';


export default function ClinicView(props) {
  const { id } = useParams();
  const [vets, setVets] = useOutletContext();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  function filterVets(arr) {
      return arr.filter((vet) => vet.id === id )
   }

  return (
    <Container className="ClinicView">
      
          <Row>
            <Col>
                <ul>
                  {
                    vets
                    ? filterVets(vets.businesses).map(vet => (

                      <Card style={{ width: '20rem' }}>
                      <Card.Img variant="top" src={vet.image_url} />
                      <Card.Body>
                        <Card.Title>{vet.name}</Card.Title>
                        <Card.Text>
                          Address: {vet.location.address1}, {vet.location.zip_code}, {vet.location.city} <br/>
                          Phone: {vet.display_phone}
                        </Card.Text>
                        <Button variant="primary">Add to favorites</Button>
                        <Button variant="primary" onClick={handleShow}>Make appointment</Button>
                      </Card.Body>
                    </Card>
                      ))
                      : null
                  }
                </ul>
              </Col>
          </Row>
        
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add appointment to your tasks</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <MakeAppointmentForm />
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Appointment
                </Button>
              </Modal.Footer>
          </Modal>

    </Container>
    
    

    //render clinic details per id, filter with the help of useParams
    //link to make appointments component
    //popup fetching vet info and prefill form
    
  )
}
