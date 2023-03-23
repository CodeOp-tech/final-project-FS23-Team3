import React, { useState, useEffect } from 'react';
import Api from '../helpers/Api';
import "./UrgentToDos.css";
import Table from 'react-bootstrap/Table';

let toDate = (date) => {
    let dateFormatted = date.split(/[- :.T]/).slice(0, -4).join(', ');
    let dateObj = new Date(dateFormatted);
    let month = new Intl.DateTimeFormat("en-US", {month:"long"}).format(dateObj);
    let day = dateObj.getUTCDate() + 1;
    let year = dateObj.getUTCFullYear();
    return (`${month} ${day}, ${year}`);
}

export default function UrgentToDos(props) {
    const[urgentTodos, setUrgentTodos] = useState([]);
    const[urgentAppointments, setUrgentAppointments] = useState([]);
    const[pets, setPets] = useState([]);
    const [combinedList, setCombinedList] = useState([]);
    const [petIds, setPetIds] = useState([]);

    useEffect(() => {
        getTodos();
    }, [pets.length]);

    useEffect(() => {
        getAppointments();
    }, []);

    useEffect(() => {
        getPets();
    }, []);

    useEffect(() => {
        getOwnerPetIds();
    }, []);

    useEffect(() => {
        combineLists();
    }, [urgentAppointments.length, urgentTodos.length, petIds.length]);

    async function getTodos(){
        let myresponse = await Api.getContent('/appointments/urgent');
        if (myresponse.ok){
            setUrgentTodos(myresponse.data);
        } else {
            console.log(`Error! ${myresponse.error}`);
        }
    }

    async function getOwnerPetIds() {
        let id = props.user.id;
        let myresponse = await Api.getOwnerPetIds(id);
        if (myresponse.ok){
          setPetIds(myresponse.data)
        } else {
          console.log(`Error! ${myresponse.error}`)
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
        let newList = [...newAppointments, ...newTodos];
        newList=newList.filter(a => petIds.includes(+a.PetId));
        newList.sort(function(a,b){
            return new Date(a.date) - new Date(b.date);
          });
        setCombinedList(newList);
    }

  return (
    <div className="UrgentToDos">
        { combinedList.length > 1 &&
        <div>
        <h2>Urgent upcoming tasks:</h2>
        <Table>
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
        </Table>
        </div>
        }
        {combinedList.length === 0 &&
        <h2>Urgent upcoming tasks: none</h2>}
    </div>
  )
}
