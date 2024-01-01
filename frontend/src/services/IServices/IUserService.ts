import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserService  {
  signIn(email: string, password: string): Promise<Result<{userDTO: IUserDTO,token:any }>>;
  signUp(userDTO: IUserDTO): Promise<Result<{userDTO: IUserDTO,token:any }>>;
}