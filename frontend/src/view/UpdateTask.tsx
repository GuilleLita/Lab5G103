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
    const taskName = useRef<any>(null);
    const buildingsCode = useRef<any>(null);
    const floorsId = useRef<any>(null);
    const initialPoint = useRef<any>(null);
    const destinationPoint = useRef<any>(null);
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
        let newtask = Task.create({
                                taskName: taskName.current.value,
                                buildingsCode: buildingsCode.current.value,
                                floorsId: floorsId.current.value,
                                initialPoint: initialPoint.current.value, 
                                destinationPoint: destinationPoint.current.value,
                                status: status.current.value});
        if(newtask.isSuccess){
            viewmodel.updateTask(newtask.getValue());
            alert("task updated")
        }
        else{
            alert(newtask.error);
        }
       
    }



    return (
        <div className="Task-Body">
            <h1>EditTask</h1>
            <p>Edit any propety and click Update Task to edit the Task with the new values</p>
            <div className='twoboxes'>
                <div className="Task-selection">
                    <p>Which is the id of the task?</p>
                    <AsyncSelect styles={customStyles} isSearchable={false} cacheOptions defaultOptions loadOptions={promiseOptions} onChange={handleInputChange} />
                    </div> 
                <div className="Task-info">
                    
                    <div className='twoboxes'>
                        
                        <div className='info'>
                           
                            <p className='infotext'>taskName </p>
                            <textarea ref={taskName} id="taskName" name="name" className='input-desc' />
                            <p className='infotext'>buildingsCode </p>
                            <textarea ref={buildingsCode} id="buildingsCode" name="name" className='input-desc' />
                            <p className='infotext'>floorsId </p>
                            <textarea ref={floorsId} id="floorsId" name="name" className='input-desc' />
                            <p className='infotext'>initialPoint </p>
                            <textarea ref={initialPoint} id="initialPoint" name="name" className='input-desc' />
                            <p className='infotext'>status </p>
                            <textarea ref={destinationPoint} id="destinationPoint" name="name" className='input-desc' />
                            <p className='infotext'>status </p>
                            <textarea ref={status} id="status" name="name" className='input-desc' />
                            
                            
                            
                        </div>
                        
                        <button className="submit" onClick={OnClickListner} >Update Task</button>
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