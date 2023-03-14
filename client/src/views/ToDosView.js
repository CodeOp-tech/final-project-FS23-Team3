import React, { useState, useEffect } from 'react';
import Api from '../helpers/Api';
import "./ToDoView.css";

export default function ToDosView() {
    const[appointments, setAppointments] = useState([]);
    const[pets, setPets] = useState([]);

    useEffect(() => {
        getAppointments();
    }, []);

    useEffect(() => {
        getPets();
    }, [])

    async function getAppointments(){
        let myresponse = await Api.getContent('/appointments');
        if (myresponse.ok){
            setAppointments(myresponse.data);
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
        <h1>All Tasks:</h1>
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
                        <td>{a.completeBy.split(/[- :.T]/).slice(0, -4).join('-')}</td>
                        <td>{(pets.find(p => p.id === a.PetId)) ? (pets.find(p => p.id === a.PetId)).name : ""}</td>
                    </tr>

                ))
            }
            </tbody>
        </table>
    </div>
  )
}
