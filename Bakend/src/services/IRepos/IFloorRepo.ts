import { Repo } from "../../core/infra/Repo";
import { Floor } from "../../domain/floor";


export default interface IFloorRepo extends Repo<Floor> {
	save(floor: Floor): Promise<Floor>;
	//findByEmail (email: UserEmail | string): Promise<User>;
	findById (id: string): Promise<Floor>;
	findByName (name:  string): Promise<Floor>;
	findByBuildingCode (code: string): Promise<Floor[]>;
}