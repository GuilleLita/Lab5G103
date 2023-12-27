import config from '../config'
import { Service, Inject} from 'typedi';

import IBuildingService from '../services/IServices/IBuildingService';
import ITaskService from '../services/IServices/ITaskService';

import { ITaskDTO } from '../dto/ITaskDTO';
import { Result } from '../core/logic/Result';
import { IBuildingDTO } from '../dto/IBuildingDTO';
import { TaskMap } from '../mappers/TaskMap';
import { Task } from '../domain/task';


export default class UpdateTaskViewModel
{
    constructor(
        @Inject(config.services.building.name) private buildingService : IBuildingService,
        @Inject(config.services.task.name) private taskService : ITaskService
        )

    {}; 
    public async updateTask(task: Task): Promise<boolean> {
        let taskDTO = TaskMap.toDTO(task);
        let taskOrError = await this.taskService.updateTask(taskDTO);
        if (taskOrError.isFailure) {
            return false;
        }
        return true;
        
    }

    public async getTaskByName(taskName: string): Promise<Task> { 
        let taskOrError = await this.taskService.getTaskByName(taskName);
        if (taskOrError.isFailure) {
            return null;
        }
        let task = taskOrError.getValue().taskDTO;
        
        return TaskMap.toDomain(task);
    }
/*
    public async setTask(taskId: string, newStatus: string): Promise<Result<{ taskDTO: ITaskDTO }>> {
        try {
            if (!taskId || !newStatus) {
                return Result.fail<{ taskDTO: ITaskDTO }>('taskId and newStatus are required IN VIEWMODEL.');
       
            }
            const existingTaskResult = await this.taskService.getTaskByName(taskId);
    
            if (existingTaskResult.isFailure) {
                return Result.fail<{ taskDTO: ITaskDTO }>(`Error al obtener la tarea: ${existingTaskResult.error}`);
            }
            const existingTask = existingTaskResult.getValue().taskDTO;
            const updatedTask: ITaskDTO = { ...existingTask };

            updatedTask.status = newStatus;
            const updateResult = await this.taskService.updateTask(updatedTask);
            if (updateResult.isFailure) {
                return Result.fail<{ taskDTO: ITaskDTO }>(`Error al actualizar la tarea: ${updateResult.error}`);
            }
    
            return Result.ok<{ taskDTO: ITaskDTO }>({ taskDTO: updatedTask });
        } catch (error) {
            return Result.fail<{ taskDTO: ITaskDTO }>(`Error al actualizar la tarea: ${error}`);
        }
    }
    */
/*
    public async setTask(taskId: string, newStatus: string): Promise<Result<{ taskDTO: ITaskDTO; }>> {
       /* const existingTask = await this.taskService.getTaskById(taskId);
    
        if (!existingTask) {
            return null;
        }
    
        // Actualizar solo el campo de estado
        existingTask.status = newStatus;
    
        return this.taskService.updateTask(existingTask);
        
        let taskDTO = TaskMap.toDTO(Task);
        let taskOrError = await this.taskService.setTask(taskDTO);
        if (taskOrError.isFailure) {
            return false;
        }
       return true;
       return this.taskService.updateTaskStatus(taskId, newStatus);
    }*/
    /*
// En tu view model (UpdateTaskViewModel)
public async setTask(taskId: string, newStatus: string): Promise<Result<{ taskDTO: ITaskDTO }>> {
    try {
        const existingTaskResult = await this.taskService.getTaskById(taskId);

        if (existingTaskResult.isFailure) {
            return Result.fail(`Error al obtener la tarea: ${existingTaskResult.error}`);
        }

        const existingTask = existingTaskResult.getValue().taskDTO;

        // Crear una nueva tarea con los valores antiguos y el nuevo estado
        const updatedTask: ITaskDTO = {
            ...existingTask,
            status: newStatus,
        };

        const updateResult = await this.taskService.updateTask(updatedTask);

        if (updateResult.isFailure) {
            return Result.fail(`Error al actualizar la tarea: ${updateResult.error}`);
        }

        return Result.ok({ taskDTO: updatedTask });
    } catch (error) {
        return Result.fail(`Error al actualizar la tarea: ${error}`);
    }
}
*/
    

    public async searchTasks () {
        let tasks: any[] = [];
        let tasksOrError = (await this.taskService.getTasks());
        if (tasksOrError.isFailure) {
            return [];
        }
        let data = tasksOrError.getValue().taskDTO;
        for (let i = 0; i < data.length; i++) {
            tasks.push({ value: data[i].taskId, label: data[i].taskId });
        }
        return tasks;
    }

    public async searchlistTasks (status: string) {
        let tasks: any[] = [];
        /*let status = (await this.buildingService.getBuildings()).getValue().buildingDTO;
        let buildingCode = "";
        for (let i = 0; i < buildings.length; i++) {
            if (buildings[i].buildingName === buildingName) {
                buildingCode = buildings[i].buildingCode;
                break;
            }
        }
        console.log(buildingCode);*/
        const res = await fetch(config.ServerURL + '/api/task/getbystatus?status=' + status);
        const data = await res.json();
        for (let i = 0; i < data.taskDTO.length; i++) {
            tasks.push(data.taskDTO[i]);
        }
        console.log(tasks);
        return tasks;
    }

    public async fetchTasks() : Promise<any[]>{
        var tasks: ITaskDTO[] = [];
        var retval : any[] = [];
        const data = await this.taskService.getTasks();
        tasks = data.getValue().taskDTO;
        for (let i = 0; i < tasks.length; i++) {
            retval.push({ value: tasks[i].taskId, label: tasks[i].taskId });
        }
    
        return retval;
    }

    public async getTasks () {
        let tasksOrError = (await this.taskService.getTasks());
        if (tasksOrError.isFailure) {
            return [];
        }
        let data = tasksOrError.getValue().taskDTO;
        return data;
    }
   
}

