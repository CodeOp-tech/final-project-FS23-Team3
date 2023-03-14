import React from 'react'

export default function VetSearch() {
  return (
    <div className="VetSearch">

        <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>My location</Form.Label>
                <Form.Control type="email" placeholder="Enter your current location." />
                <Form.Text className="text-muted">
                  We'll search for vets in the area you specify.
                </Form.Text>
              </Form.Group>

              
              <Button variant="primary" type="submit">
                Find vet in my area!
              </Button>
        </Form>


    </div>
  )
}
