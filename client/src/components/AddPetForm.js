import React, {useState} from "react";
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const EMPTY_FORM = {
    name: "",
    type: "",
    age: 0,
    sex: "",
}

function AddPetForm(props) {
    const[formData, setFormData] = useState(props.editedPet || EMPTY_FORM);

    function handleChange(e) {
        const {name, value, type} = e.target;

        setFormData((data) => ({
            ...data,
            [e.target.name]: e.target.value,
          }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addPet(formData);
        setFormData(EMPTY_FORM);
        if (props.editedPet) {

            props.setShowForm(false);
            props.setEditedPet(null);
        } else {
            props.setFormState(false);
        }


      };
    
    const addPet = async (pet) => {

      if(!pet.id) {

        let options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pet),
        };

        try {
            let response = await fetch(`/api/pets/${props.user.id}/pets/`, options);
            if (response.ok) {
                props.getPets();
            } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
            }
      } catch (err) {
            console.log(`Server Error: ${err.message}`);
      }

    } else {

        try {
          let options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pet),
          };
  
          let response = await fetch(`/api/pets/${pet.id}`, options);
  
          if (response.ok) {
            let pet = await response.json();
            props.setFeatPet(null);
            props.getPets();

            
          } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
          }
        } catch (err) {
            console.log(`Server Error: ${err.message}`);
        }
      }
    };

    return (

        <Table className ="AddPetForm" responsive="sm">
             <InputGroup>
                <tr>
                    <td>
                        Name:
                        <Form.Control 
                            key = "name"
                            placeholder = "Pet's name"
                            type = "text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        Type of animal:
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
                    </td>
                </tr>
                <tr>
                    <td>
                        Age:
                        <Form.Control 
                            key = "age"
                            placeholder = "age"
                            type = "number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        Gender:
                        <Form.Select 
                            key = "sex"
                            type = "text"
                            name="sex"
                            value={formData.sex}
                            onChange={handleChange}>
                                <option>Select gender</option>
                                <option value="M">male</option>
                                <option value="F">female</option>
                        </Form.Select>
                    </td>
                </tr>
                <tr>
                    <Button
                        onClick = {handleSubmit}>
                        save pet
                    </Button>
                </tr>
            </InputGroup>
        </Table>
    )
    
    }

export default AddPetForm;
