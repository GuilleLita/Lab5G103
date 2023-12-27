import { Result } from "../../core/logic/Result";
import { ITaskDTO } from "../../dto/ITaskDTO";

export default interface ITaskService  {
  CreateTask(taskDTO: ITaskDTO): Promise<Result<{taskDTO: ITaskDTO}>>;
  updateTask(taskDTO: ITaskDTO): Promise<Result<{taskDTO: ITaskDTO}>>;
  getTaskId(): Promise<Result<{taskDTO: ITaskDTO[]}>>;
  updateTaskStatus(taskId: string, newStatus: string): Promise<Result<{ taskDTO: ITaskDTO }>>;
  getTasksByStatus(status: string): Promise<Result<{ taskDTO: ITaskDTO[]; }>>;
  }
