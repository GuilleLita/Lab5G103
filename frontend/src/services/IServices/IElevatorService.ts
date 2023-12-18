import { Result } from "../../core/logic/Result";
import { IElevatorDTO } from "../../dto/IElevatorDTO";

export default interface IElevatorService  {
  //CreateElevator(elevatorDTO: IElevatorDTO): Promise<Result<{elevatorDTO: IElevatorDTO}>>;
  //updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<{elevatorDTO: IElevatorDTO}>>;
  getElevatorsByBuilding(code: string): Promise<Result<{elevatorDTO: IElevatorDTO[]}>>;
}
