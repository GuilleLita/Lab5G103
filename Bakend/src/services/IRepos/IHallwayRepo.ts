import { Repo } from "../../core/infra/Repo";
import { Hallway } from "../../domain/hallway";


export default interface IHallwayRepo extends Repo<Hallway> {
	save(hallway: Hallway): Promise<Hallway>;
	//findByEmail (email: UserEmail | string): Promise<User>;
	findById (id: string): Promise<Hallway>;
	existsWithFloor (name:  string): Promise<boolean>;
}