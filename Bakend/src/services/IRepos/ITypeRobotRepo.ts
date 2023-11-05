import { Repo } from "../../core/infra/Repo";
import { TypeRobot } from "../../domain/typerobot";

export default interface ITypeRobotRepo extends Repo<TypeRobot> {
  save(typerobot: TypeRobot): Promise<TypeRobot>;
  findByrobotType (robotType: string): Promise<TypeRobot>;   
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}