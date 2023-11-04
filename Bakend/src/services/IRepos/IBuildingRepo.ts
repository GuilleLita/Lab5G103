import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/building";


export default interface IBuildingRepo extends Repo<Building> {
	save(building: Building): Promise<Building>;
	//findByEmail (email: UserEmail | string): Promise<User>;
	findByCode (code: string): Promise<Building>;
	findByName (name:  string): Promise<Building>
	getAll(): Promise<Building[]>;
	getBuildingsByMinMax(min: number, max: number): Promise<Building[]>;
}