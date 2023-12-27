import { Result } from "../../core/logic/Result";
import { ITaskDTO } from "../../dto/ITaskDTO";

export default interface ITaskService  {
  getTasksByStatus (status: string) : Promise<Result<{ taskDTO: ITaskDTO[]; }>>;
  CreateTask(taskDTO: ITaskDTO): Promise<Result<{taskDTO: ITaskDTO}>>;
  updateTask(task: ITaskDTO): Promise<Result<{ taskDTO: ITaskDTO[]; }>>; 
  getTasks () : Promise<Result<{ taskDTO: ITaskDTO[]; }>>;
  getTaskByName(taskName: string): Promise<Result<{ taskDTO: ITaskDTO; }>>;
  updateTaskStatus(taskId: string, newStatus: string): Promise<Result<{ taskDTO: ITaskDTO }>>;
  //getElevatorsByBuilding(code: string): Promise<Result<{elevatorDTO: IElevatorDTO[]}>>;
}
