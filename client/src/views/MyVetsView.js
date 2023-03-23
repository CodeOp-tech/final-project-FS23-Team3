import React, {useEffect, useState, useContext} from 'react'
import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import Local from "../helpers/Local";
import './MyVetsView.css';
import OwnerContext from '../context/OwnerContext.js';
import MakeAppointmentFormViaFav from "../components/MakeAppointmentFormViaFav.js";


export default function MyVetsView(props) {
    const { id } = useParams();
    const [myVets, setMyVets] = useState([]);
    const user = useContext(OwnerContext);
    const [show, setShow] = useState(false);

    useEffect(() => {
        getMyVets();
      }, []);

    async function getMyVets() {
        let options = {
            headers: {},
        }

        let token = Local.getToken();
            if (token) {
                options.headers['Authorization'] = 'Bearer ' + token;
                }

        let path = `/api/clinics/${user.id}/clinics`
        
        try {
            let response = await fetch (path, options);
            if (response.ok) {
                let myVets = await response.json();
                setMyVets(myVets)
            } else {
                console.log(`Server error: ${response.status} ${response.statusText}`);
            }
        } catch (err) {
            console.log(`Server Error: ${err.message}`);
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

//     async function handleDelete(id) {
//         // let vet = myVets.find(v => v.id === +id);
//         // console.log(id)
//         // console.log(vet.id)
//         // console.log(vet)

//         let options = {
//            method: "DELETE",
//            headers: { "Content-Type": "application/json" },
//          }
     
//          let token = Local.getToken();
//              if (token) {
//                  options.headers['Authorization'] = 'Bearer ' + token;
//              }

//          try {
//              let response = await fetch(`/api/clinics/clinic/${id}`, options);
//                if (response.ok) {
//                  let myVets = await response.json();
//                  setMyVets(myVets);
//                } else {
//                  console.log(`Server error: ${response.status} ${response.statusText}`);
//                }
//              } catch (err) {
//                console.log(`Server error: ${err.message}`);
//              }
//   }

  return (
    <div className='MyVetsView'>
            <Table striped borderless= {true} bordered={ false } hover responsive="sm" id='vetList'>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Clinic</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th></th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        myVets
                            ? myVets.map(vet=> (
                                <tr>
                                    <td className='count'></td>
                                    <td>{vet.name}</td>
                                    <td>{vet.address}</td>
                                    <td>{vet.contactPhone}</td>
                                    <td><Button variant="primary" onClick={handleShow} >
                                            <Link to={`/myvets/${vet.id}`} style={{textDecoration: 'none', color: 'white'}}>
                                                Add appointment
                                            </Link>
                                        </Button>
                                    </td>
                                    {/* <td><Button onClick={handleDelete(vet)}>Delete</Button>
                                    </td> */}
                                </tr>
                            ))
                            : null
                    }   
                    </tbody>
            </Table>

            <Modal show={show} onHide={handleClose} >
              <Modal.Header closeButton>
                <Modal.Title>Add appointment details</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <MakeAppointmentFormViaFav 
                    myVets={myVets}
                    handleCloseCb={handleClose}
                    />
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
          </Modal>

            
    </div>
        );

}
