import { Repo } from "../../core/infra/Repo";
import { Robot } from "../../domain/robot";


export default interface IRobotRepo extends Repo<Robot> {
	save(robot: Robot): Promise<Robot>;
	//findByEmail (email: UserEmail | string): Promise<User>;
	findByDomainId (id: string): Promise<Robot>;
	findByName (name:  string): Promise<Robot>

}