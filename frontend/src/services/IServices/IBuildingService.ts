import { Result } from "../../core/logic/Result";
import { IBuildingDTO } from "../../dto/IBuildingDTO";

export default interface IBuildingService  {
  getBuildings () : Promise<Result<{ buildingDTO: IBuildingDTO[]; }>>;
}
