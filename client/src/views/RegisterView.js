import React, { useState, useEffect } from 'react';

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
        props.registerUserCb(newUser.username, newUser.password, newUser.firstname, newUser.lastname, newUser.email)
    }
  return (
    <div className="RegisterView" onSubmit={handleSubmit}>
        <form>
            <label>First Name:
                <input
                type = "text"
                name = "firstname"
                required
                value = {newUser.firstname}
                onChange = {handleChange}
                />
            </label>
            <label>Last Name:
                <input
                type = "text"
                name = "lastname"
                required
                value = {newUser.lastname}
                onChange = {handleChange}
                />
            </label>
            <label>Email Address:
                <input
                type = "text"
                name = "email"
                required
                value = {newUser.email}
                onChange = {handleChange}
                />
            </label>
            <label>Choose a Username:
                <input
                type = "text"
                name = "username"
                required
                value = {newUser.username}
                onChange = {handleChange}
                />
            </label>
            <label>Choose a Password:
                <input
                type = "password"
                name = "password"
                required
                value = {newUser.password}
                onChange = {handleChange}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}