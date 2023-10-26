import { Result } from "../../core/logic/Result";
import { IBuildingDTO } from "../../dto/IBuildingDTO";

export default interface IUserService  {
  CreateBuilding(buildingDTO: IBuildingDTO): Promise<Result<{buildingDTO: IBuildingDTO}>>;

}
