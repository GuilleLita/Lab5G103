import { Result } from "../../core/logic/Result";
import { ITaskDTO } from "../../dto/ITaskDTO";

export default interface ITaskService  {
  CreateTask(taskDTO: ITaskDTO): Promise<Result<{taskDTO: ITaskDTO}>>;
  updateTask(taskDTO: ITaskDTO): Promise<Result<{taskDTO: ITaskDTO}>>;
  //getElevatorsByBuilding(code: string): Promise<Result<{elevatorDTO: IElevatorDTO[]}>>;
}
