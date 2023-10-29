import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/building";


export default interface IUserRepo extends Repo<Building> {
	save(building: Building): Promise<Building>;
	//findByEmail (email: UserEmail | string): Promise<User>;
	findById (id: string): Promise<Building>;
}