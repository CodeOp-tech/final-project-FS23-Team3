import React, { useState, useEffect } from 'react';
import Api from '../helpers/Api';
import "./ToDoView.css";

let toDate = (date) => {
    let dateFormatted = date.split(/[- :.T]/).slice(0, -4).join(', ');
    let dateObj = new Date(dateFormatted);
    let month = new Intl.DateTimeFormat("en-US", {month:"long"}).format(dateObj);
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    return (`${month} ${day}, ${year}`)
}

let toDateObj = (date) => {
    let dateFormatted = date.split(/[- :.T]/).slice(0, -4).join(', ');
    let dateObj = new Date(dateFormatted);
    return dateObj;
}

export default function ToDosView() {
    //appointments state here ONLY includes future appointments - see getAppointments() to see filter
    const[appointments, setAppointments] = useState([]);
    const[pets, setPets] = useState([]);

    useEffect(() => {
        getAppointments();
    }, []);

    useEffect(() => {
        getPets();
    }, []);

    async function getAppointments(){
        let myresponse = await Api.getContent('/appointments/complete-by');
        if (myresponse.ok){
            let filteredAppointments = [];
            for(let i = 0; i < myresponse.data.length; i++){
                let date = toDateObj(myresponse.data[i].completeBy);
                if (date > new Date()){
                    filteredAppointments.push(myresponse.data[i])
                }
            }
            setAppointments(filteredAppointments);
        } else {
            console.log(`Error! ${myresponse.error}`);
        }
    }

    async function getPets(){
        let myresponse = await Api.getContent('/pets');
        if (myresponse.ok){
            setPets(myresponse.data);
        } else {
            console.log(`Error! ${myresponse.error}`);
        }
    }

  return (
    <div className="container">
        <h1>All Upcoming Tasks:</h1>
        <table>
            <tbody>
                <tr>
                    <th id="main-th">To Do:</th>
                    <th>Complete By:</th>
                    <th>For Pet:</th>
                </tr>
                {
                appointments.map((a) => (
                    <tr key={a.id} >
                        <td>{a.nextSteps}</td>
                        <td>{toDate(a.completeBy)}</td>
                        <td>{(pets.find(p => p.id === a.PetId)) ? (pets.find(p => p.id === a.PetId)).name : ""}</td>
                    </tr>

                ))
            }
            </tbody>
        </table>
    </div>
  )
}
