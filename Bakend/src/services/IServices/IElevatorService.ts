import { Result } from "../../core/logic/Result";
import { IElevatorDTO } from "../../dto/IElevatorDTO";

export default interface IElevatorService  {
  CreateElevator(rlevatorDTO: IElevatorDTO): Promise<Result<{elevatorDTO: IElevatorDTO}>>;

}
