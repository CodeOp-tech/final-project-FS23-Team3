import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000/api/yelp'

export default function MakeAppointmentView() {
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('');
  const [error, setError] = useState('');
  const [vets, setVets] = useState(null);


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


  return (
    <Container className="MakeAppointmentView">
      
      <Row>
        <Form onSubmit={handleSubmit}>
              <Col>
                  
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
          
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                    Find vet in my area!
                </Button>
              </Col>
        </Form> 
      </Row>

      <Row>
        <Col>
          <ul style={{listStyle:"none"}}>
            {
              vets
              ? vets.businesses.map(vet => (
                <li key={vet.id}>
                  Clinic: {vet.name},
                  Distance: {Math.floor(`${vet.distance}`)}m,
                  <Nav.Link as={Link}>
                    See details
                  </Nav.Link>
                </li>
              ))
              : null
            }
          </ul>
        </Col>
        <Col>
        </Col>
      </Row>



    </Container>
  )
}
