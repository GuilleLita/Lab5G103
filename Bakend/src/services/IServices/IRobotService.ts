import { Result } from "../../core/logic/Result";
import { IRobotDTO } from "../../dto/IRobotDTO";

export default interface IRobotService  {
  CreateRobot(robotDTO: IRobotDTO): Promise<Result<{robotDTO: IRobotDTO}>>;
  updateRobot(robotDTO: IRobotDTO): Promise<Result<{robotDTO: IRobotDTO}>>;
  
  }
