import { Result } from "../../core/logic/Result";
import ITypeRobotDTO from "../../dto/ITypeRobotDTO";

export default interface ITypeRobotService  {
  createTypeRobot(typerobotDTO: ITypeRobotDTO): Promise<Result<ITypeRobotDTO>>;
  updateTypeRobot(typerobotDTO: ITypeRobotDTO): Promise<Result<ITypeRobotDTO>>;

}
