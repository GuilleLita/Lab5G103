import { Repo } from "../../core/infra/Repo";
import { Elevator } from "../../domain/elevator";


export default interface IElevatorRepo extends Repo<Elevator> {
	save(elevator: Elevator): Promise<Elevator>;
	findById (id: string): Promise<Elevator>;
	findByBuildingCode (code: string): Promise<Elevator[]>;
	existsInFloor (name:  string): Promise<boolean>;
}