import ITaskService from "./IServices/ITaskService";
import config from "../config";
import { ITaskDTO } from "../dto/ITaskDTO";
import { Result } from "../core/logic/Result";
import { Task } from "../domain/task";


export class taskService implements ITaskService{
    private static _instance : taskService;

    private constructor(){}

    public static get instance() {
        return this._instance ?? (this._instance = new taskService())
    }

    public async CreateTask(task: ITaskDTO): Promise<Result<{taskDTO: ITaskDTO}>> {

        try {
            console.log(JSON.stringify(task));
            const res = await fetch(config.ServerURL + '/api/task/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
                });
            if(res.status === 201){
                const data = await res.json();
                return data;
            }
            else{

                return Result.fail<{taskDTO: ITaskDTO}>(await res.text());
            }
        } catch (e) {
            throw e;
        }
    }
    public async getTaskByName(taskName: string): Promise<Result<{ taskDTO: ITaskDTO; }>> {

        try {
            const res = await fetch(config.ServerURL + '/api/task?taskName=' + taskName);
            const Task = await res.json().then((data) => {
                return data.taskDTO;
            });
            
            if (Task === null) {
              return Result.fail<{taskDTO: ITaskDTO}>("Task not found");
            }
            else {
                console.log(Task);
              return Result.ok<{taskDTO: ITaskDTO}>( {taskDTO: Task} )
            }
          } catch (e) {
            throw e;
          }
    }

    public async updateTaskStatus(taskId: string, newStatus: string): Promise<Result<{ taskDTO: ITaskDTO }>> {
        try {
            const res = await fetch(config.ServerURL + '/api/task/updatetaskstatus', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taskId: taskId,
                    status: newStatus
                })
            });
    
            if (res.status === 200) {
                const data = await res.json();
                return data;
            } else {
                return Result.fail<{ taskDTO: ITaskDTO }>(await res.text());
            }
        } catch (e) {
            throw e;
        }
    }
    
    
    

    public async updateTask(task: ITaskDTO): Promise<Result<{ taskDTO: ITaskDTO[]; }>> {
      try {
        //if (!task.taskId || !task.status) {
         //   return null
        //}
          console.log(JSON.stringify(task));
          const res = await fetch(config.ServerURL + '/api/task/update', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(task)
              });
          if(res.status === 201){
              const data = await res.json();
              return data;
          }
          else{

              return Result.fail<{taskDTO: ITaskDTO[]}>(await res.text());
          }
      } catch (e) {
          throw e;
      }
  }

  public async getTasks () : Promise<Result<{ taskDTO: ITaskDTO[]; }>>{

    try {
        const res = await fetch(config.ServerURL + '/api/task/getall');
        const Tasks = await res.json().then((data) => {
            return data.taskDTO;
        });
        //console.log(Buildings);
        
        if (Tasks === null) {
          return Result.fail<{taskDTO: ITaskDTO[]}>("Task not found");
        }
        else {
          return Result.ok<{taskDTO: ITaskDTO[]}>( {taskDTO: Tasks} )
          }
      } catch (e) {
        throw e;
      }
    }
    
    public async getTasksByStatus (status: string) : Promise<Result<{ taskDTO: ITaskDTO[]; }>>{
            
        try {
            const res = await fetch(config.ServerURL + '/api/task/getbystatus?status=' + status);
            const Tasks = await res.json().then((data) => {
                return data.taskDTO;
            });
            console.log(Tasks);
            
            if (Tasks === null) {
            return Result.fail<{taskDTO: ITaskDTO[]}>("Task not found");
            }
            else {
            return Result.ok<{taskDTO: ITaskDTO[]}>( {taskDTO: Tasks} )
            }
        } catch (e) {
            throw e;
        }
    }

    }