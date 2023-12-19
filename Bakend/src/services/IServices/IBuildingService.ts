import { Result } from "../../core/logic/Result";
import { IBuildingDTO } from "../../dto/IBuildingDTO";

export default interface IBuildingService  {
  CreateBuilding(buildingDTO: IBuildingDTO): Promise<Result<{buildingDTO: IBuildingDTO}>>;
  updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<{buildingDTO: IBuildingDTO}>>;
  getAllBuildings(): Promise<Result<{buildingDTO: IBuildingDTO[]}>>;
  getBuildingsByMinMax(min: number, max: number): Promise<Result<{buildingDTO: IBuildingDTO[]}>>;
}
