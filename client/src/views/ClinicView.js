import React, { useState , useContext } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import MakeAppointmentForm from "../components/MakeAppointmentForm.js";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/esm/Table';

import Local from "../helpers/Local";
import OwnerContext from '../context/OwnerContext.js';
import placeholder_img from "../images/placeholder_img.svg"; 
import './ClinicView.css'


export default function ClinicView(props) {
  const { id } = useParams();
  const [vets, setVets] = useOutletContext();
  const user = useContext(OwnerContext)
  const [favoriteClinics, setFavoriteClinics] = useState([]);
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  function filterVets(arr) {
      return arr.filter((vet) => vet.id === id )
   }
  
   async function handleAddFavorite(vet) {
          let clinic = {
            name: `${vet.name}`,
            contactPhone: `${vet.display_phone}`,
            address: `${vet.location.address1}, ${vet.location.zip_code}, ${vet.location.city}`,
            OwnerId: `${user.id}`
          }
          
          let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(clinic),
          }
      
          let token = Local.getToken();
              if (token) {
                  options.headers['Authorization'] = 'Bearer ' + token;
              }
      
          try {
            let response = await fetch(`/api/clinics/${vet.id}`, options);
            if (response.ok) {
              let favorites = await response.json();
              setFavoriteClinics(favorites);
            } else {
              console.log(`Server error: ${response.status} ${response.statusText}`);
            }
          } catch (err) {
            console.log(`Server error: ${err.message}`);
          }
   }
   
   async function handleDeleteFavorite(vet) {
         let options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
      
          let token = Local.getToken();
              if (token) {
                  options.headers['Authorization'] = 'Bearer ' + token;
              }

          try {
              let response = await fetch(`/api/clinics/${vet.id}`, options);
                if (response.ok) {
                  let favorites = await response.json();
                  setFavoriteClinics(favorites);
                } else {
                  console.log(`Server error: ${response.status} ${response.statusText}`);
                }
              } catch (err) {
                console.log(`Server error: ${err.message}`);
              }
   }

  return (
    <Container className="ClinicView">
      
          <Row>
            <Col>
                
                  {
                    vets
                    ? filterVets(vets.businesses).map(vet => (


                          <Table borderless= {true} bordered={ false } responsive="sm" id='vetList'>
                                              <thead>
                                                  <tr>
                                                  <img style={{width: "20rem"}} src={vet.image_url || placeholder_img} />
                                                  </tr>
                                                  <tr>
                                                    <th>{vet.name}</th>
                                                  </tr>
                                              </thead>

                                              <tbody>
                                                  <tr>
                                                    <td>Address: {vet.location.address1}, {vet.location.zip_code}, {vet.location.city}</td>
                                                  </tr>
                                                  <tr>
                                                    <td>Phone: {vet.display_phone}</td>
                                                  </tr>
                                                  <tr>
                                                    <td><ToggleButton
                                                                    id="toggle-check"
                                                                    type="checkbox"
                                                                    variant="outline-danger"
                                                                    checked={checked}
                                                                    value="0"
                                                                    onChange={(e) => setChecked(e.currentTarget.checked)}
                                                                    onClick={e => checked ? handleDeleteFavorite(vet) : handleAddFavorite(vet) }
                                                                  >
                                                                    Add to my vets
                                                        </ToggleButton></td>
                                                  </tr>
                                                  <tr>
                                                    <td><Button variant="primary" onClick={handleShow}>Add appointment</Button></td>
                                                  </tr> 
                                              </tbody>
                            </Table>
                      ))

                    : null
                  }  
              </Col>
          </Row>
        
          <Modal show={show} onHide={handleClose} >
              <Modal.Header closeButton>
                <Modal.Title>Add appointment details</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <MakeAppointmentForm 
                    vets={vets} 
                    favoriteClinics={favoriteClinics} 
                    handleAddFavoriteCb={handleAddFavorite}
                    handleCloseCb={handleClose}
                    />
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
          </Modal>

    </Container>
    
  )
}
