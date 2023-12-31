import React from 'react';
import  AsyncSelect, { useAsync } from 'react-select/async';
import  ReactSelect from 'react-select';
import { useState } from 'react';
import {useRef} from 'react';
import config from '../config'

//import fetch from 'node-fetch';
import './AddTask.css';
import { get } from 'http';
import Input from 'react-select/dist/declarations/src/components/Input';

import UpdateTaskViewModel from '../viewmodel/UpdateTaskViewModel';
import buildingService from '../services/buildingService';
import { taskService } from '../services/taskService';
import { visitIterationBody } from 'typescript';
import { Task } from '../domain/task';




function UpdateTask() {
    let viewmodel = new UpdateTaskViewModel(buildingService.instance, taskService.instance);    
    const [selected, setSelected] = useState({ value: '', label: ''});
    type SelectOptionType = { label: string, value: string }
    
    const status = useRef<any>(null);
    const customStyles = {
        control: (base:any) => ({
          ...base,
          height: 40,
          minHeight: 40,
          width: 200,
          minWidth: 200
        
        })
      };


    const promiseOptions = () =>
        new Promise<any[]>((resolve) => {  
            
            resolve(viewmodel.searchTasks());
        }
    );

    const handleInputChange =async (option: SelectOptionType | null) => {
        if (option) {
            setSelected(option)
           // let task = await viewmodel.getTaskById(option.value);
           // status.current.value = task.status;
          }
    }

    const OnClickListner = async () => {
        let statusinsertado=status.current.value;
            viewmodel.updateTaskStatus(selected.value, statusinsertado);
            alert("task updated");
        
       
    }



    return (
        <div className="Task-Body">
            <h1>Reject or Accept Tasks</h1>
            <p>Select the Id and introduce Reject or Accept in status</p>
            <div className='twoboxes'>
                <div className="Task-selection" id="status-dropdown">
                    <p>Which is the id of the task?</p>
                    <AsyncSelect styles={customStyles} id="status-dropdown2" isSearchable={false} cacheOptions defaultOptions loadOptions={promiseOptions} onChange={handleInputChange} />
                    </div> 
                <div className="Task-info">
                    
                    <div className='twoboxes'>
                        
                        <div className='info'>
                           
                            <p className='infotext'>status </p>
                            <textarea ref={status} id="status" name="name" className='input-desc' />
                            
                            <button className="submit" id="Update" onClick={OnClickListner} >Update Task</button>
                
                            
                        </div>
                        </div>

                </div> 
                
            </div>
            
            
            

        </div>
    )

   /*
    const OnClickListner = async () =>{
        if (status.current !== null  && selected.value) {
            let input5 = status.current.value   
            let taskOrError = viewmodel.setTask(selected.value, input5)
            
            if ((await taskOrError).isFailure) {
                alert((await taskOrError).errorValue())
            } else {

                alert("Task update")
            }
            
        }
    }


    return (
        <div className="Task-body">
            <h1>Add Task</h1>
            <div className="Task-Form">
                
                <div className="Task-Form-Field">
                    <label htmlFor="tasks">tasks</label>
                    <AsyncSelect styles={customStyles} isSearchable={false} cacheOptions defaultOptions loadOptions={promiseOptions} onChange={handleInputChange} />
                </div>
                
            </div>
            <div className='Status'>
                <label htmlFor="status">Status:  </label>
                <input ref={status} type="text" id="status" name="name" className='input' />
            </div>
            <button className="submit" onClick={OnClickListner} >Update</button>
        </div>

    );*/
}
export default UpdateTask;