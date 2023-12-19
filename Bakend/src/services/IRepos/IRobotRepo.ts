import { Repo } from "../../core/infra/Repo";
import { Robot } from "../../domain/robot";


export default interface IRobotRepo extends Repo<Robot> {
	save(robot: Robot): Promise<Robot>;
	saveInhibit(robot: Robot): Promise<Robot>;
	savedesInhibit(robot: Robot): Promise<Robot>;
	findByDomainId (id: string): Promise<Robot>;
	getAll(): Promise<Robot[]>;
	getRobotsByTask(task:string): Promise<Robot[]>;
}