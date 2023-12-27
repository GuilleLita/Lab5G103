import { Inject } from 'typedi';
import config from '../config';
import ITaskService from '../services/IServices/ITaskService';
import { Result } from '../core/logic/Result';
import { ITaskDTO } from '../dto/ITaskDTO';




export default class ListTaskViewModel {

    constructor(
        @Inject(config.services.task.name) private taskService : ITaskService
        )
    {}; 



    public async searchListTasks (status: string) {
        let tasks: any[] = [];
       /* let taskstatus = (await this.taskService.getTasks()).getValue().taskDTO;
        let statuscode = "";
        for (let i = 0; i < taskstatus.length; i++) {
            if (taskstatus[i].status === status) {
                statuscode = taskstatus[i].status;
                break;
            }
        }
        console.log(statuscode);*/
        const res = await fetch(config.ServerURL + '/api/task/getbystatus?status=' + status);
        const data = await res.json();
        for (let i = 0; i < data.taskDTO.length; i++) {
            tasks.push(data.taskDTO[i]);
        }
        console.log(tasks);
        return tasks;
    }


    public async searchTasks() {
        let tasks: any[] = [];
        let tasksOrError = await this.taskService.getTasks();
    
        if (tasksOrError.isFailure) {
            return [];
        }
    
        let data = tasksOrError.getValue().taskDTO;
        let addedWords = new Set<string>(); // Conjunto para rastrear palabras agregadas
    
        for (let i = 0; i < data.length; i++) {
            let status = data[i].status;
    
            // Verificar si la palabra ya ha sido agregada antes de hacer push
            if (!addedWords.has(status)) {
                tasks.push({ value: status, label: status });
                addedWords.add(status); // Agregar la palabra al conjunto
            }
        }
    
        return tasks;
    }
    
}