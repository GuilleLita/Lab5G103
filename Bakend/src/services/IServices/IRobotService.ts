import { Result } from "../../core/logic/Result";
import { IRobotDTO } from "../../dto/IRobotDTO";

export default interface IRobotService  {
  CreateRobot(robotDTO: IRobotDTO): Promise<Result<{robotDTO: IRobotDTO}>>;
  updateRobot(robotDTO: IRobotDTO): Promise<Result<{robotDTO: IRobotDTO}>>;
  inhibitRobot(robotId: string): Promise<Result<{robotDTO: IRobotDTO}>>;
  desinhibitRobot(robotId: string): Promise<Result<{robotDTO: IRobotDTO}>>;
  getAllRobots(): Promise<Result<{robotDTO: IRobotDTO[]}>>;
  getRobotsByTask(task: string): Promise<Result<{robotDTO: IRobotDTO[]}>>;

  }
