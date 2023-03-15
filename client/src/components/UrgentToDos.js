import React, { useState, useEffect } from 'react';
import Api from '../helpers/Api';

let toDate = (date) => {
    let dateFormatted = date.split(/[- :.T]/).slice(0, -4).join(', ');
    let dateObj = new Date(dateFormatted);
    let month = new Intl.DateTimeFormat("en-US", {month:"long"}).format(dateObj);
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    return (`${month} ${day}, ${year}`);
}

export default function UrgentToDos() {
    const[urgentTodos, setUrgentTodos] = useState([]);
    const[urgentAppointments, setUrgentAppointments] = useState([]);
    const[pets, setPets] = useState([]);
    const [combinedList, setCombinedList] = useState([]);

    useEffect(() => {
        getTodos();
    }, []);

    useEffect(() => {
        getAppointments();
    }, []);

    useEffect(() => {
        getPets();
    }, []);

    useEffect(() => {
        combineLists();
    }, [urgentAppointments.length, urgentTodos.length]);

    async function getTodos(){
        let myresponse = await Api.getContent('/appointments/urgent');
        if (myresponse.ok){
            setUrgentTodos(myresponse.data);
        } else {
            console.log(`Error! ${myresponse.error}`);
        }
    }
    
    async function getAppointments(){
        let myresponse = await Api.getContent('/appointments/urgent-appts');
        if (myresponse.ok){
            setUrgentAppointments(myresponse.data);
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

    function combineLists(){
        let newTodos = [...urgentTodos];
        newTodos = newTodos.map(obj => ({id: ("1" + obj.id), title: obj.nextSteps, date: obj.completeBy, PetId: obj.PetId}));
        let newAppointments = [...urgentAppointments];
        newAppointments = newAppointments.map(obj => ({id: ("2" + obj.id), title: obj.title, date: obj.date, PetId: obj.PetId}));
        for (let appointment of newAppointments){
            if (appointment.title == null){
                appointment.title = "Appointment"
            }
        }
        let newList = [...newAppointments, ...newTodos]
        newList.sort(function(a,b){
            return new Date(a.date) - new Date(b.date);
          });
        setCombinedList(newList);
    }

  return (
    <div>
        <h1>Urgent Tasks:</h1>
        <table>
            <tbody>
                <tr>
                    <th id="main-th">To Do:</th>
                    <th>Complete By:</th>
                    <th>For Pet:</th>
                </tr>
                {
                combinedList.map((a) => (
                    <tr key={a.id} >
                        <td>{a.title}</td>
                        <td>{toDate(a.date)}</td>
                        <td>{(pets.find(p => p.id === a.PetId)) ? (pets.find(p => p.id === a.PetId)).name : ""}</td>
                    </tr>

                ))
            }
            </tbody>
        </table>
    </div>
  )
}
