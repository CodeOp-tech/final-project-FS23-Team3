import React, { useState } from 'react';


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
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <input 
                type = "text"
                name = "usernameInput"
                value = {username}
                onChange = {handleChange}
                required
                />
            </label>
            <label>
                <input 
                type = "password"
                name = "passwordInput"
                value = {password}
                onChange = {handleChange}
                required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}
