import { Result } from "../../core/logic/Result";
import { IFloorDTO } from "../../dto/IFloorDTO";

export default interface IFloorService  {
  getFloors () : Promise<Result<{ floorDTO: IFloorDTO[]; }>>;
  updateFloor(floor: IFloorDTO): Promise<Result<{ floorDTO: IFloorDTO[]; }>>; 
  getFloorByName(floorName: string): Promise<Result<{ floorDTO: IFloorDTO; }>>;
}
