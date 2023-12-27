import { Repo } from "../../core/infra/Repo";
import { Task } from "../../domain/task";


export default interface ITaskRepo extends Repo<Task> {
    findStatus (status: string): Promise<Task[]>;
	save(task: Task): Promise<Task>;
	findById (id: string): Promise<Task>;
	getAll(): Promise<Task[]>;
	//findByBuildingCode (code: string): Promise<Task[]>;
	//existsInFloor (name:  string): Promise<boolean>;
}