import { Repo } from "../../core/infra/Repo";
import { TypeRobot } from "../../domain/typerobot";

export default interface ITypeRobotRepo extends Repo<TypeRobot> {
  save(typerobot: TypeRobot): Promise<TypeRobot>;
  findByrobotType (robotType: string): Promise<TypeRobot>;   

}