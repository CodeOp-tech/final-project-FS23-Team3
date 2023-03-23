import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./LoginView.css"


export default function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event) => {
        let { name, value } = event.target;
        switch(name) {
            case 'usernameInput':
                setUsername(value);
                break;
            case 'passwordInput':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(username, password)
        props.doLoginCb(username, password);
    }

  return (
    <div className="container LoginView">
        {/* <h2>Login</h2> */}
        <Form style={{width:"60%", margin:"0 auto", marginTop:"50px"}} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username:</Form.Label>
              <Form.Control 
                type="text" 
                name="usernameInput"
                value={username}
                required
                onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password:</Form.Label>
              <Form.Control 
                type="password" 
                name="passwordInput"
                value={password}
                required
                onChange={handleChange}/>
          </Form.Group>
            <Button type="submit">Log in</Button>
        </Form>
    </div>
  )
}
