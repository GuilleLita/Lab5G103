import React from 'react';
import  AsyncSelect, { useAsync } from 'react-select/async';
import config from '../config'
import './ListTask.css';
import ListTaskViewModel from '../viewmodel/ListTaskViewModel';

import {taskService} from '../services/taskService';


function ListTasks(){
    let viewmodel = new ListTaskViewModel(taskService.instance);

    const [selected, setSelected] = React.useState<any>(null);
    const [tasks, setTasks] = React.useState<any[]>([]);

    type SelectOptionType = { label: string, value: string }

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
            let _tasks = await viewmodel.searchListTasks(option.value);
            setTasks(_tasks);
        }
            
        }
        

    return (
        <div className="Task-body">
            <h4>Select status to lists their tasks</h4>
            <label htmlFor="status">status</label>
            <AsyncSelect styles={customStyles} isSearchable={false} cacheOptions defaultOptions loadOptions={promiseOptions} onChange={handleInputChange} />
            
            <div className="Task-list">
                <h4>Tasks</h4>
                <div className="Task-list-items">
                {tasks.map((task, index) => (
                    <div key={index} className="Task-list-item">
                        <div className="Task-list-item-text">
                            <p className='Task-header'>Task {index + 1}</p>
                        </div>
                        <div className="Task-list-item-text">
                        <label htmlFor="taskName">Task:</label>
                        <p className='Task-p'>{task.taskName}</p>
                        </div>
                        <div className="Task-list-item-text">
                        <label htmlFor="buildingsCode">buildingsCode</label>
                        <p className='Task-p'>{task.buildingsCode[0]},{task.buildingsCode[1]}</p>
                        </div>
                        <div className="Task-list-item-text">
                        <label htmlFor="floorsId" >floorsId</label>
                        <p className='Task-p'>{task.floorsId[0]}, {task.floorsId[1]}</p>
                        </div>
                        
                        <div className="Task-list-item-text">
                        <label htmlFor="destinationPoint" >destinationPoint</label>
                        <p className='Task-p'>{task.destinationPoint[0]}, {task.destinationPoint[1]}</p>
                        </div>
                        <div className="Task-list-item-text">
                        <label htmlFor="status">status:</label>
                        <p className='Task-p'>{task.status}</p>
                        </div>
                    </div>
                ))}
                </div>
                  
                </div>
        </div>
    )

}
export default ListTasks;