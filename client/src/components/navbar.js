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

        <Navbar.Brand href="#home">petAppProject</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
                <Nav.Link href="#HomeView">Home</Nav.Link>

                <NavDropdown title="My pets" id="basic-nav-dropdown">
                <NavDropdown.Item href="#PetView">All my pets</NavDropdown.Item>
                <NavDropdown.Item href="#AddPetView">Add a pet</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="My to-do's" id="basic-nav-dropdown">
                <NavDropdown.Item href="#UrgentListView">Urgent tasks</NavDropdown.Item>
                <NavDropdown.Item href="#AppointmentsView">All to-do's</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="My vets" id="basic-nav-dropdown">
                <NavDropdown.Item href="#VetListView">My vets</NavDropdown.Item>
                <NavDropdown.Item href="#VetChatView">Vet chat</NavDropdown.Item>
                </NavDropdown>
          </Nav >


        {
            props.user
            ?   <Nav className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: {props.user.firstname} {props.user.lastname}
                    </Navbar.Text>

                    <Button >
                        <Link to="/" onClick={props.logoutCb}>
                            Logout
                        </Link>
                    </Button>
                </Nav>
            :   <Nav className="justify-content-end">
                    <Button>
                        <Link to="/login">
                            Login
                        </Link>
                    </Button>
                </Nav>
        }
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
