import { Repo } from "../../core/infra/Repo";
import { Task } from "../../domain/task";


export default interface ITaskRepo extends Repo<Task> {
	save(task: Task): Promise<Task>;
	findById (id: string): Promise<Task>;
	//findByBuildingCode (code: string): Promise<Task[]>;
	//existsInFloor (name:  string): Promise<boolean>;
}