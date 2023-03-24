import React, {useState} from "react";
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import "./AddPetForm.css"

const EMPTY_FORM = {
    name: "",
    type: "",
    age: 0,
    sex: "",
    img_filename: null
}

function AddPetForm(props) {
    const[inputs, setInputs] = useState(props.editedPet || EMPTY_FORM);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
      }

    function handleImageChange(e) {
        const file = e.target.files[0];
        setInputs(inputs => ({ ...inputs, img_filename: file}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.getOwnerPetsCb();

        const formData = new FormData();
        for (const [key, value] of Object.entries(inputs)) {
          formData.append(key, value);
        }
        console.log(inputs)

        //if we are adding a new pet we add with files, otherwise just a stringified body
        !props.editedPet ?
        addPet(formData)
        : addPet(inputs)

        setInputs(EMPTY_FORM);

        if (props.editedPet) {
            props.handleHide();
        } else if(props.setFormState){
            props.setFormState(false);
        }
      };

    
    
    const addPet = async (pet) => {

      if(!pet.id) {

        let options = {
          method: "POST",
          //headers: { "Content-Type": "application/json" },
          body: pet,
        };

        try {
            let response = await fetch(`/api/pets/${props.user.id}/pets/`, options);
            if (response.ok) {
                if(props.getPets){
                  props.getPets();
                }
                console.log("Added pet:" + pet.name);
            } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
            }
      } catch (err) {
            console.log(`Server Error: ${err.message}`);
      }

    } else {
        console.log(pet);

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
            props.setEditedPet(null);
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

        <Table responsive="sm" className="AddPetFormView">
             <InputGroup>

             {!props.editedPet &&
             <tr>
                    Upload picture
                    <Form.Control 
                        key = "img_filename"
                        type = "file"
                        name= "img_filename"
                        onChange={handleImageChange}
                    />
            </tr>
            }
                <tr>
                    
                        Name*
                        <Form.Control 
                            key = "name"
                            type = "text"
                            name="name"
                            value={inputs.name}
                            onChange={handleChange}
                        />
                    
                </tr>
                <tr>
                        Type of animal
                        <Form.Select 
                            key = "type"
                            type = "text"
                            name="type"
                            value={inputs.type}
                            onChange={handleChange}>
                                <option>Select animal type</option>
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                                <option value="horse">Horse</option>
                                <option value="other">Other</option>
                        </Form.Select>
                </tr>
                <tr>
                        Age
                        <Form.Control 
                            key = "age"
                            placeholder = "age"
                            type = "number"
                            name="age"
                            value={inputs.age}
                            onChange={handleChange}
                        />
                </tr>
                <tr>
                        Gender
                        <Form.Select 
                            key = "sex"
                            type = "text"
                            name="sex"
                            value={inputs.sex}
                            onChange={handleChange}>
                                <option>Select gender</option>
                                <option value="M">male</option>
                                <option value="F">female</option>
                        </Form.Select>
                </tr>
                <tr>
                    <Button
                        bsStyle="primary"
                        onClick = {handleSubmit}>
                        save pet
                    </Button>
                </tr>
            </InputGroup>
        </Table>
    )
    
    }

export default AddPetForm;
