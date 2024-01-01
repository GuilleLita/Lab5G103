import React from 'react';
import './App.css';
import { createStore } from 'state-pool';
import AddHallway from './AddHallway';
import EditFloor from './EditFloor';
import ListElevators from './ListElevators';
import AddTask from './AddTask';
import UpdateTask from './UpdateTask';
import ListTask from './ListTask';
import SignIn from './SignIn';
const store = createStore();
store.setState("body", "home");


function App() {
  const [body, updateBody] = store.useState("body");
  
  const home = () => {
    window.location.href = '/';
  }
  const ChangeBody = (str: String) => {
   updateBody(str) ;
  }

  if(localStorage.getItem("token") == null){
    return (
      <div className="App">
        <div className="App-header">
          <div className="Header-Title" onClick ={home}>RobDroneGo</div>
        </div>
        <div className="App-body">
            <SignIn />
        </div>
      </div>
    );
  }
  else

  return (
    <div className="App">

      <div className="App-header">
        <div className="Header-Title" onClick ={home}>RobDroneGo</div>
        <div className="HeaderButtons">
          <button className="Header-Button" onClick={()=>ChangeBody("addHallway")}>Add Hallway</button>
          <button className="Header-Button" onClick={()=>ChangeBody("editFloor")}>Edit Floor</button>
          <button className="Header-Button" onClick={()=>ChangeBody("listElevators")}>List elevators in building</button>
          <button className="Header-Button" onClick={()=>ChangeBody("addTask")}>Add Task</button>
          <button className="Header-Button" onClick={()=>ChangeBody("rejectacceptTask")}>Reject/Accept Task</button>
          <button className="Header-Button" onClick={()=>ChangeBody("listTask")}>List Task</button>
        </div>
        
      </div>
      <Body />
    </div>
  );
}

function Body() {
  const [body] = store.useState("body");
  switch (body) {
    case "home":
      return (
        <div className="App-body">
            <h1>Welcome</h1>
            <p>Click one of the options in the header</p>
        </div>
        )
    case "addHallway":
      return (
        <AddHallway />
        )
    case "editFloor":
      return (
        <EditFloor />
        )
    case "listElevators":
      return (
         <ListElevators />
        )
    case "addTask":
      return (
        <AddTask />
            )
    case "rejectacceptTask":
      return (
        <UpdateTask />
            )
    case "listTask":
              return (
                <ListTask />
                    )
    default:
      return (
        <div className="App-body">
            <h1>Welcome</h1>
            <p>Click one of the options in the header</p>
        </div>
        )
  }
}

export default App;
