import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import { Link, Outlet } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Offcanvas from 'react-bootstrap/Offcanvas';

import './AllClinicsView.css';
import placeholder_img from "../images/placeholder_img.svg"; 


const BASE_URL = 'http://localhost:5000/api/yelp'

export default function AllClinicsView() {
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('');
  const [error, setError] = useState('');
  const [vets, setVets] = useState(null);
  const [show, setShow] = useState(false);


  const handleLocation = e => {
    let { name, value } = e.target;
    setLocation(value)
  }

  const handleDistance = e => {
    let { name, value } = e.target;
    setDistance(value)
  }

  const handleSubmit = e => {
    e.preventDefault();
    getVets();
    //send vets to App via Cb
    setLocation('');
    setDistance('');
  }

  async function getVets() {
    setVets(null);
    setError('');

    let initialUrl = `${BASE_URL}/search?location=${location.toLowerCase()}&term=veterinarians&sort_by=distance&limit=${distance}`
    //GET fetch passing initialUrl to server to replace with yelp Url and to add header with API key
    try {
      let response = await fetch(initialUrl);
      if (response.ok) {
        let vets = await response.json();
        setVets(vets);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server Error`);
    }    
  } 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="AllClinicsView">
      
      <Row>
        <Form onSubmit={handleSubmit} >
              <div className="input" >
                  <Col xs={5}>
                      
                      <Form.Group className="mb-3" controlId="formLocation">
                        <Form.Label></Form.Label>
                        <Form.Control onChange={handleLocation} type="text" name="city" value={location} placeholder="Enter your current location" />
                        <Form.Text className="text-muted">
                          We'll search for vets in the area you specify.
                        </Form.Text>
                      </Form.Group>    
                
                  </Col>
                  <Col xs={5}>
              
                      <Form.Group className="mb-3" controlId="formDistance">
                        <Form.Label></Form.Label>
                        <Form.Control onChange={handleDistance} type="text" name="distance" value={distance} placeholder="Specify distance in meters to current location" />
                        <Form.Text className="text-muted">
                          We'll search for vets in this radius of your current location.
                        </Form.Text>
                      </Form.Group>    
              
                  </Col>

                  <Col>
                    <Button variant="primary" type="submit">
                        Find vet
                    </Button>
                  </Col>
              </div>
              
        </Form> 
      </Row>

      <Row style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px"}}>
            
              {
                vets
                ? vets.businesses.map(vet => (

                  <Card style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={vet.image_url || placeholder_img} />
                      <Card.Body style={{textAlign:"left"}}>
                        <Card.Title>{vet.name}</Card.Title>
                        <Card.Text>
                          Distance: {Math.floor(`${vet.distance}`)}m <br/>
                            <Badge bg="secondary">
                                <Nav.Link as={Link} to={`/clinics/${vet.id}`} onClick={handleShow}>
                                  See details
                                </Nav.Link>
                            </Badge>
                        </Card.Text>
                            
                      </Card.Body>
                  </Card>
                ))
                : null
              }

      </Row>

      <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Outlet context={[vets, setVets]}/>
            </Offcanvas.Body>
      </Offcanvas>

    </Container>
  )
}
