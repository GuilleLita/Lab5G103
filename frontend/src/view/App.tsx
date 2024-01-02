import React, { useEffect } from 'react';
import './App.css';
import { createStore } from 'state-pool';
import AddHallway from './AddHallway';
import EditFloor from './EditFloor';
import ListElevators from './ListElevators';
import AddTask from './AddTask';
import UpdateTask from './UpdateTask';
import ListTask from './ListTask';
import SignIn from './SignIn';
import AppViewModel from '../viewmodel/AppViewModel';
import userService from '../services/userService';
import roleService from '../services/roleService';
import { is } from 'shallow-equal-object';
const store = createStore();
store.setState("body", "default");

store.setState("user", null);

function  App() {
  let viewmodel = new AppViewModel(userService.instance, roleService.instance);


  const [body, updateBody] = store.useState("body");
  const [user, updateUser] = store.useState("user");

  const home = () => {
    window.location.href = '/';
  }

  const changeUser = () => {
    localStorage.clear();
    updateUser(null);
    updateBody("default");
    window.location.href = '/';
  }

  useEffect(() => {
    const fetchData = async () => {
      if(user != "logged"){
        if(await viewmodel.isLogged()) {
          updateUser("logged");
        }
      }
    };
    fetchData();
  });

  return (
    <div className="App">
      <div className="App-header">
        <div className="Header-Title" onClick ={home}>RobDroneGo</div>
        <div className="Header-ChangeUser" onClick={changeUser}>Change User</div>
      </div>
      <Body />
    </div>
  );
}

function Body() {

  const [llamado, setLlamado] = React.useState(false);
  let viewmodel = new AppViewModel(userService.instance, roleService.instance);

  const [headers, updateHeaders] = React.useState(<div className="HeaderButtons"></div>);

  const role = async () => {
    let role = await viewmodel.getHeaders(localStorage.getItem("role"));
    if(role == "error") {
      return (<div></div>);
    }
    switch(role) {
      case "Admin":
        return (  <div className="HeaderButtons">
                    <button className="Header-Button" onClick={()=>ChangeBody("createUser")}>Create new User</button>
                    <button className="Header-Button" onClick={()=>ChangeBody("AcceptNewUser")}>Accept registers</button>
                  </div>);
      case "Gestor":
        return (  <div className="HeaderButtons">
                    <button className="Header-Button" onClick={()=>ChangeBody("addHallway")}>Add Hallway</button>
                    <button className="Header-Button" onClick={()=>ChangeBody("editFloor")}>Edit Floor</button>
                    <button className="Header-Button" onClick={()=>ChangeBody("listElevators")}>List elevators in building</button>
                    <button className="Header-Button" onClick={()=>ChangeBody("rejectacceptTask")}>Reject/Accept Task</button>
                    <button className="Header-Button" onClick={()=>ChangeBody("listTask")}>List Task</button>
                  </div>);
      case "User":
        return  (  <div className="HeaderButtons">
        <button className="Header-Button" onClick={()=>ChangeBody("addTask")}>Add Task</button>

      </div>);
      default:
        return (<div></div>);
    }
  }

  useEffect(() => {
    
    const fetchData = async () => {
      if(user == "logged" && !llamado){
        setLlamado(true);
        const headers = await role();
        updateHeaders(headers);
      }
    };
    fetchData();
  });

  const [body, updateBody] = store.useState("body");
  const [user, updateUser] = store.useState("user");

  const ChangeBody = async (str: String) => {
    if(await viewmodel.isLogged()) updateBody(str) ;
    else {
      alert("You are not logged in");
      window.location.href = '/';
    }
  }

  if(user == "logged") {
    switch (body) {
      case "home":
        return (
          <div>
          {headers}
        <div className="App-body">
              <h1>Welcome</h1>
              <p>Click one of the options in the header</p>
          </div>
        </div>
          
          )
      case "addHallway":
        return (
          <div>
          {headers}
          <AddHallway />
          </div>
          )
      case "editFloor":
        return (
          <div>
          {headers}
          <EditFloor />
          </div>
          )
      case "listElevators":
        return (
          <div>
          {headers}
          <ListElevators />
          </div>
          )
      case "addTask":
        return (
          <div>
          {headers}
          <AddTask />
          </div>
              )
      case "rejectacceptTask":
        return (
          <div>
          {headers}
          <UpdateTask />
          </div>
              )
      case "listTask":
          return (
              <div>
                {headers}
                <ListTask />
              </div>
                      )
      case "createUser":
        return (
          <div>
          {headers}
          <div>Crear Usuario</div>
          </div>
              )
      case "AcceptNewUser":
        return (
          <div>
          {headers}
          <div>Aceptar usuario</div>
          </div>
              )
      default:
        return (
          <div>
          {headers}
        <div className="App-body">
              <h1>Welcome</h1>
              <p>Click one of the options in the header</p>
          </div>
        </div>
          
          )
    }
  }
  else {
    return (
      <SignIn />
      )
  }
}

export default App;
