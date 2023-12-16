import { Result } from "../../core/logic/Result";
import { IFloorDTO } from "../../dto/IFloorDTO";

export default interface IFloorService  {
  CreateFloor(floorDTO: IFloorDTO): Promise<Result<{floorDTO: IFloorDTO}>>;
  updateFloor(floorDTO: IFloorDTO): Promise<Result<{floorDTO: IFloorDTO}>>;
  getFloorsByBuilding(code: string): Promise<Result<{floorDTO: IFloorDTO[]}>>;
  getFloorsWithHallwaysByBuilding(code: string): Promise<Result<{floorDTO: IFloorDTO[]}>>;
  getFloorsWithElevatorByBuilding(code: string): Promise<Result<{floorDTO: IFloorDTO[]}>>;
  uploadFloorMap(floor: string, grid: [[number]]): Promise<Result<{floorDTO: IFloorDTO}>>;
  getFloor(floorName: string): Promise<Result<{floorDTO: IFloorDTO}>>;
}
