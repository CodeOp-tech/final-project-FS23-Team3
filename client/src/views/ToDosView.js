import React, { useState, useEffect } from 'react';
import Api from '../helpers/Api';
import "./ToDoView.css";

let toDate = (date) => {
    let dateFormatted = date.split(/[- :.T]/).slice(0, -4).join(', ');
    let dateObj = new Date(dateFormatted);
    let month = new Intl.DateTimeFormat("en-US", {month:"long"}).format(dateObj);
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    return (`${month} ${day}, ${year}`);
}

let threeMonthsAway = (date) => {
    let dateObj = new Date(date);
      const today = new Date();
      let futureMonth = today.getUTCMonth() + 4;
      let day = today.getUTCDate() + 1;
      let year = today.getUTCFullYear();
      let future = new Date(`${year}/${futureMonth}/${day}`);
      return (dateObj < future);
  }

export default function ToDosView() {
    //appointments and todos states here ONLY includes future appointments - see getAppointments() to see filter
    const[todos, setTodos] = useState([]);
    const[appointments, setAppointments] = useState([]);
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
    }, [appointments.length, todos.length]);

    async function getTodos(){
        let myresponse = await Api.getContent('/appointments/complete-by');
        if (myresponse.ok){
            setTodos(myresponse.data);
        } else {
            console.log(`Error! ${myresponse.error}`);
        }
    }
    
    async function getAppointments(){
        let myresponse = await Api.getContent('/appointments/future');
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

    function combineLists(){
        let newTodos = [...todos];
        newTodos = newTodos.map(obj => ({id: obj.id, title: obj.nextSteps, date: obj.completeBy, PetId: obj.PetId}));
        let newAppointments = [...appointments];
        newAppointments = newAppointments.map(obj => ({id: obj.id, title: obj.title, date: obj.date, PetId: obj.PetId}));
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
                combinedList.map((a) => (
                    <tr key={a.id} className={(threeMonthsAway(a.date)) ? "urgent" : null}>
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
