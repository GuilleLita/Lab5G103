import { Repo } from "../../core/infra/Repo";
import { Room } from "../../domain/room";


export default interface IRoomRepo extends Repo<Room> {
	save(room: Room): Promise<Room>;
	//findByEmail (email: UserEmail | string): Promise<User>;
	findById (id: string): Promise<Room>;
}