import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

let EMPTY_FORM = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: ''
}

export default function RegisterView(props) {
    const [newUser, setNewUser] = useState(EMPTY_FORM);

    const handleChange = (event) => {
        let { name, value } = event.target;
        setNewUser((newUser) => ({
            ...newUser,
            [name]: value,
          }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.registerUserCb(newUser.firstname, newUser.lastname, newUser.username, newUser.email, newUser.password)
    }
  return (
    <div className="RegisterView" >
        <Form style={{width:"60%", margin:"0 auto", marginTop:"50px"}} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control 
                    type="text" 
                    name="firstname"
                    value={newUser.firstname}
                    required
                    onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control 
                    type="text" 
                    name="lastname"
                    value={newUser.lastname}
                    required
                    onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address:</Form.Label>
                <Form.Control 
                    type="text" 
                    name="email"
                    value={newUser.email}
                    required
                    onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Choose a username:</Form.Label>
                <Form.Control 
                    type="text" 
                    name="username"
                    value={newUser.username}
                    required
                    onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Create a password:</Form.Label>
                <Form.Control 
                    type="password" 
                    name="password"
                    value={newUser.password}
                    required
                    onChange={handleChange}/>
            </Form.Group>
            <Button type="submit">Create account</Button>
        </Form>
    </div>
  )
}