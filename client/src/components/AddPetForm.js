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

        const formData = new FormData();
        for (const [key, value] of Object.entries(inputs)) {
          formData.append(key, value);
        }
        addPet(formData);
        setInputs(EMPTY_FORM);

        if (props.editedPet) {
            props.setShowForm(false);
            props.setEditedPet(null);
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
                console.log(pet);
                if(props.getPets){
                props.getPets();
                }
                console.log("Added pet:" + pet);
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

        <Table responsive="sm">
             <InputGroup>
             <tr>
                    Upload picture:
                    <Form.Control 
                        key = "img_filename"
                        type = "file"
                        name= "img_filename"
                        onChange={handleImageChange}
                    />
                
            </tr>
                <tr>
                    
                        Name:
                        <Form.Control 
                            key = "name"
                            placeholder = "Pet's name"
                            type = "text"
                            name="name"
                            value={inputs.name}
                            onChange={handleChange}
                        />
                    
                </tr>
                <tr>
                        Type of animal:
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
                        Age:
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
                        Gender:
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
                        onClick = {handleSubmit}>
                        save pet
                    </Button>
                </tr>
            </InputGroup>
        </Table>
    )
    
    }

export default AddPetForm;
