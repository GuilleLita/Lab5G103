import { Result } from "../../core/logic/Result";
import { IBuildingDTO } from "../../dto/IBuildingDTO";

export default interface IBuildingService  {
  CreateBuilding(buildingDTO: IBuildingDTO): Promise<Result<{buildingDTO: IBuildingDTO}>>;

}
