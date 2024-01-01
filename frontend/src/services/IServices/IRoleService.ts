import { Result } from "../../core/logic/Result";
import  IRoleDTO  from "../../dto/IRoleDTO";

export default interface IRoleService  {
  GetRoles(): Promise<Result<{roleDTO: IRoleDTO[]}>>;
}