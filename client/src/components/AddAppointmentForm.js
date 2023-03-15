import React from 'react'

export default function AddAppointmentForm() {
  return (
    <div className="AddAppointmentForm">
        <h1>Add information about a past appointment</h1>
        <form>
            <label>
                Date:
                <input 
                type="text"
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}
