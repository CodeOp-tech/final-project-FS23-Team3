import React, { useState, useEffect } from 'react';
import Api from '../helpers/Api';
import Table from 'react-bootstrap/Table';
import "./ToDoView.css";
import { Link } from "react-router-dom";

let toDate = (date) => {
    let dateFormatted = date.split(/[- :.T]/).slice(0, -4).join('');
    let dateNumber = +dateFormatted ;
    let dateString=dateNumber.toString();
    let dateReformatted = dateString.slice(0,4)+ "-"+dateString.slice(4,6)+"-"+dateString.slice(6,8)
    let dateObj = new Date(dateReformatted);
    let month = new Intl.DateTimeFormat("en-US", {month:"long"}).format(dateObj);
    let day = dateObj.getUTCDate() ;
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

export default function ToDosView(props) {
    //appointments and todos states here ONLY includes future appointments - see getAppointments() to see filter
    const[todos, setTodos] = useState([]);
    const[appointments, setAppointments] = useState([]);
    const[pets, setPets] = useState([]);
    const [combinedList, setCombinedList] = useState([]);
    const [selectedAppt, setSelectedAppt] = useState(null);
    const [petIds, setPetIds] = useState([])

    useEffect(() => {
        getTodos();
    }, [pets.length]);

    useEffect(() => {
        getAppointments();
    }, []);

    useEffect(() => {
        setPets(props.pets);
    }, []);

    useEffect(() => {
        getOwnerPetIds();
    }, []);

    useEffect(() => {
        props.getOwnerClinicsCb();
    },[])

    useEffect(() => {
        combineLists();
    }, [appointments.length, todos.length, petIds.length]);

    async function getOwnerPetIds() {
        let id = props.user.id;
        let myresponse = await Api.getOwnerPetIds(id);
        if (myresponse.ok){
          setPetIds(myresponse.data)
        } else {
          console.log(`Error! ${myresponse.error}`)
        }
      }

    

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

    // async function getPets(){
    //     let myresponse = await Api.getContent('/pets');
    //     if (myresponse.ok){
    //         setPets(myresponse.data);
    //     } else {
    //         console.log(`Error! ${myresponse.error}`);
    //     }
    // }

    function combineLists(){
        let newTodos = [...todos];
        newTodos = newTodos.map(obj => ({combinedId: ("1" + obj.id), id: obj.id, title: obj.nextSteps, date: obj.completeBy, PetId: obj.PetId}));
        let newAppointments = [...appointments];
        newAppointments = newAppointments.map(obj => ({combinedId: ("2" + obj.id), id: obj.id, title: obj.title, date: obj.date, PetId: obj.PetId}));
        for (let appointment of newAppointments){
            if (appointment.title == null){
                appointment.title = "Appointment"
            }
        }
        let newList = [...newAppointments, ...newTodos]
        newList=newList.filter(a => petIds.includes(a.PetId))
        newList.sort(function(a,b){
            return new Date(a.date) - new Date(b.date);
          });
        setCombinedList(newList);
    }

    async function getOneTask(id, combinedId){
        let myresponse = await Api.getOneAppointment(id);
        if (myresponse.ok){
            let selected = myresponse.data;
            let selectedName = combinedList.filter(a => a.combinedId === combinedId)[0].title;
            selected.selectedName = selectedName;
            setSelectedAppt(selected);
        } else {
            console.log(`Error! ${myresponse.error}`);
        }
      }
    

  return (
    <div className="ToDosView">
        <div id="left-grid">
            <h2>all upcoming tasks:</h2>
            <p style={{marginBottom:"4%"}}>*urgent tasks are highlighted</p>
            <Table className="all-tasks-table">
                <tbody>
                    <tr>
                        <th id="main-th">To Do:</th>
                        <th>Complete By:</th>
                        <th>For Pet:</th>
                    </tr>
                    {
                    combinedList.map((a) => (
                        <tr key={a.combinedId} className={(threeMonthsAway(a.date)) ? "urgent" : null}>
                            <td onClick={e => getOneTask(a.id, a.combinedId)} className="cursor-pointer">{a.title}</td>
                            <td onClick={e => getOneTask(a.id, a.combinedId)} className="cursor-pointer">{toDate(a.date)}</td>
                            <td onClick={e => getOneTask(a.id, a.combinedId)} className="cursor-pointer">{(props.pets.find(p => p.id === a.PetId)) ? (props.pets.find(p => p.id === a.PetId)).name : ""}</td>
                        </tr>

                    ))
                }
                </tbody>
            </Table>
        </div>
        <div id="right-grid">
            <Table id="h3-table">
            { !selectedAppt && 
                    <h3>Click on an item for more info</h3>
                }
            { selectedAppt && 
                <h3>{selectedAppt.selectedName}</h3>
                
                }
            </Table>
            { selectedAppt &&
            <div>
            <Table className="selected-table" style={{marginTop:"0px"}}>
            <tbody>
            {!selectedAppt.completeBy && 
                <tr>
                    <td>Appointment date:</td>
                    <td>{toDate(selectedAppt.date)}</td>
                </tr>
                }
                {selectedAppt.PetId && 
                <tr>
                    <td>Pet:</td>
                    <td>{(props.pets.find(p => p.id === selectedAppt.PetId)).name}</td>
                </tr>
                }
                {!selectedAppt.completeBy && 
                <tr>
                    <td>Clinic:</td>
                    <td>{(props.clinics.find(c => +c.id === +selectedAppt.ClinicId)) ? (props.clinics.find(c => +c.id === +selectedAppt.ClinicId)).name : ''}</td>
                </tr>
                }
                {selectedAppt.completeBy && 
                <tr>
                    <td>Complete by:</td>
                    <td>{toDate(selectedAppt.completeBy)}</td>
                </tr>
                }
                {selectedAppt.completeBy && 
                <tr>
                    <td>Assigned at appointment on:</td>
                    <td>{toDate(selectedAppt.date)}</td>
                </tr>
                }
                {selectedAppt.completeBy && 
                <tr>
                    <td>Related clinic:</td>
                    <td>{(props.clinics.find(c => +c.id === +selectedAppt.ClinicId)) ? (props.clinics.find(c => +c.id === +selectedAppt.ClinicId)).name : ''}</td>
                </tr>
                }
                {selectedAppt.completeBy && 
                <tr>
                    <td>Summary from assigning appointment:</td>
                    <td>{selectedAppt.summary}</td>
                </tr>
                }
                {selectedAppt.createdAt && 
                <tr>
                    <td>Date created:</td>
                    <td>{toDate(selectedAppt.createdAt)}</td>
                </tr>
                }
            </tbody>
        </Table>
        <Link to={`/appointments/${selectedAppt.PetId}`} className="btn btn-todos">View all of {(props.pets.find(p => p.id === selectedAppt.PetId)).name}'s appointments</Link>
        </div>
            }
            </div>
        </div>
  )
 }