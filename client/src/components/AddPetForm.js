import React, {useState} from "react";
import Table from 'react-boostrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import "./addPetForm.css";

const EMPTY_FORM = {
    name: "",
    type: "",
    age: 0,
    sex: "",
}

function AddPetForm(props) {
    const[formData, setFormData] = useState(EMPTY_FORM);

    function handleChange(e) {
        setFormData((data) => ({
            ...data,
            [e.target.name]: e.target.value,
          }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addPet(data);
        setFormData(EMPTY_FORM);
      };
    
    const addPet = async (data) => {
      try {
        let options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        };

        let response = await fetch(`/pets/${owner_id}`, options);

        if (response.ok) {
          //Not sure what we want to do here yet, if anything
        } else {
          console.log(`Server error: ${response.status} ${response.statusText}`);
        }
      } catch (err) {
        console.log(`Server Error`);
      }
    };

    return (
        <Table className ="addPetForm" responsive="sm">
            <InputGroup>
                <tr>
                    <Form.Control 
                        key = "name"
                        placeholder = "Pet's name"
                        type = "text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </tr>
                <tr>
                    <Form.Select 
                        key = "type"
                        type = "text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}>
                            <option>Select animal type</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="horse">Horse</option>
                            <option value="other">Other</option>
                    </Form.Select>
                </tr>
                <tr>
                    <Form.Control 
                        key = "age"
                        placeholder = "age"
                        type = "number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </tr>
                <tr>
                    <Form.Select 
                        key = "sex"
                        type = "text"
                        name="type"
                        value={formData.sex}
                        onChange={handleChange}>
                            <option>Select gender</option>
                            <option value="M">male</option>
                            <option value="F">female</option>
                    </Form.Select>
                </tr>
            </InputGroup>
        </Table>
    )
    
    }

export default AddPetForm;
