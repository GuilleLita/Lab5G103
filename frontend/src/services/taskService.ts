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
    public async updateTask(task: ITaskDTO): Promise<Result<{ taskDTO: ITaskDTO[]; }>> {
      try {
          
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

    
}