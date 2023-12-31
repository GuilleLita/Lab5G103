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

import AddTaskViewModel from '../viewmodel/AddTaskViewModel';
import buildingService from '../services/buildingService';
import { taskService } from '../services/taskService';
import { visitIterationBody } from 'typescript';




function AddTask() {
    let viewmodel = new AddTaskViewModel(buildingService.instance, taskService.instance);    
    const [floor1Options, setFloor1Options] = useState<any[]>([]);
    const [floor2Options, setFloor2Options] = useState<any[]>([]);

    const [selected, setSelected] = useState({ value: '', label: ''});
    const [selected2, setSelected2] = useState({ value: '', label: ''});
    const [floorSelected, setFloorSelect] = useState({ value: '', label: ''});
    const [floorSelected2, setFloorSelect2] = useState({ value: '', label: ''});
    type SelectOptionType = { label: string, value: string }

    const taskName = useRef<any>(null);
    const initialPoint1 = useRef<any>(null);
    const initialPoint2 = useRef<any>(null);
    const destinationPoint1 = useRef<any>(null);
    const destinationPoint2 = useRef<any>(null);
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
            
            resolve(viewmodel.fetchBuildings());
        }
    );

    const handleInputChange =async (option: SelectOptionType | null) => {
        if (option) {
            
            setSelected(option)
            setFloor1Options(await viewmodel.searchFloors(option.value));
          }
    }

    const handleInputChange2 =async (option: SelectOptionType | null) => {
        if (option) {
            
            setSelected2(option)
            setFloor2Options(await viewmodel.searchFloors(option.value));
          }
    }

    const handleFloorInputChange2 =async (option: SelectOptionType | null) => {
        if (option) {
            setFloorSelect2(option)
          }
    }

    const handleFloorInputChange =async (option: SelectOptionType | null) => {
        if (option) {
            setFloorSelect(option)
          }
    }

    const OnClickListner = async () =>{
        if (taskName.current !== null && status.current !== null && initialPoint1.current !== null && initialPoint2.current !== null && destinationPoint1.current !== null && destinationPoint2.current !== null) {
            let input0 = taskName.current.value
            let input1 = initialPoint1.current.value
            let input2 = initialPoint2.current.value
            let input3 = destinationPoint1.current.value
            let input4 = destinationPoint2.current.value
            let input5 = status.current.value   
            let taskOrError = viewmodel.setTask(input0, selected.value, selected2.value, floorSelected.value, floorSelected2.value, input1, input2, input3, input4, input5)
            if ((await taskOrError).isFailure) {
                alert((await taskOrError).errorValue())
            } else {

                alert("Task added")
            }
        }
    }


    return (
        <div className="Task-body">
            <h1>Add Task</h1>
            <div className='taskName'>
                <label htmlFor="taskName">taskName:  </label>
                <input ref={taskName} type="text" id="taskName" name="name" className='input' />
            </div>
            <div className="Task-Form">
                
                <div className="Task-Form-Field">
                    <label htmlFor="building1">Building 1</label>
                    <AsyncSelect styles={customStyles} id="building1" isSearchable={false} cacheOptions defaultOptions loadOptions={promiseOptions} onChange={handleInputChange} />
                    <label htmlFor="floor1">Floor</label>
                    <ReactSelect styles={customStyles} id="floor1" isSearchable={false} options={floor1Options} onChange={handleFloorInputChange}/>
                </div>
                <div className="Task-Form-Field">
                    <label htmlFor="building2">Building 2</label>
                    <AsyncSelect styles={customStyles} id="building2" isSearchable={false} cacheOptions defaultOptions loadOptions={promiseOptions} onChange={handleInputChange2} />
                    <label htmlFor="floor2">Floor</label>
                    <ReactSelect styles={customStyles} id="floor2" isSearchable={false} options={floor2Options} onChange={handleFloorInputChange2} />
                </div>
                
            </div>
            <div className='PositionForm'>
                <label htmlFor="position">Initial Position:  </label>
                <input ref={initialPoint1} type="text" id="initialPoint1" name="name" className='input' />
                <input ref={initialPoint2} type="text" id="initialPoint2" name="name" className='input' />

            </div>
            <div className='PositionForm'>
                <label htmlFor="position">Destination Position:  </label>
                <input ref={destinationPoint1} type="text" id="destinationPoint1" name="name" className='input' />
                <input ref={destinationPoint2} type="text" id="destinationPoint2" name="name" className='input' />

            </div>
            <div className='Status'>
                <label htmlFor="status">Status:  </label>
                <input ref={status} type="text" id="status" name="name" className='input' />
            </div>
            <button className="submit" id="Create" onClick={OnClickListner} >Create Task</button>
        </div>

    );
}
export default AddTask;