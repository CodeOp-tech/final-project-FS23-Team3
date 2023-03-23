import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './NavBar.css';

export default function NavBar(props) {
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>

        <Navbar.Brand as={Link} to="/">PetVet</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>

                <NavDropdown title="My pets" id="basic-nav-dropdown">
                <NavDropdown.Item href="/pets">All my pets</NavDropdown.Item>
                {/* <NavDropdown.Item href="/addpets">Add a pet</NavDropdown.Item> */}
                </NavDropdown>

                <NavDropdown title="My to-do's" id="basic-nav-dropdown">
                {/* <NavDropdown.Item href="#UrgentListView">Urgent tasks</NavDropdown.Item> */}
                <NavDropdown.Item as={Link} to="/to-dos">All to-do's</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="My vets" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/clinics">Find a vet</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/myvets">My vets</NavDropdown.Item>
                <NavDropdown.Item href="#VetChatView">Vet chat</NavDropdown.Item>
                </NavDropdown>
          </Nav >


        {
            props.user
            ?   <Nav className="justify-content-end">
                    <Navbar.Text>
                        {/* <Nav.Link as={Link} to={`/users/${props.user.id}`} > */}
                        <Nav.Link as={Link} to={`/`} >
                            Profile: {props.user.firstname} {props.user.lastname}
                        </Nav.Link>
                    </Navbar.Text>

                    <Button >
                        <Nav.Link as={Link} to="/" onClick={props.logoutCb}>
                            Logout
                        </Nav.Link>
                    </Button>
                </Nav>
            :   <Nav className="justify-content-end">
                    <Button>
                        <Nav.Link as={Link} to="/login">
                            Login
                        </Nav.Link>
                    </Button>
                </Nav>
        }
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
