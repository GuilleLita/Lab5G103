import { Repo } from "../../core/infra/Repo";
import { Hallway } from "../../domain/hallway";


export default interface IHallwayRepo extends Repo<Hallway> {
	save(hallway: Hallway): Promise<Hallway>;
	findById (id: string): Promise<Hallway>;
	existsWithFloor (name:  string): Promise<boolean>;
	findByBuildings (code1: string, code2: string): Promise<Hallway[]>;
}	