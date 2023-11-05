import { Result } from "../../core/logic/Result";
import { IHallwayDTO } from "../../dto/IHallwayDTO";

export default interface IHallwayService  {
  CreateHallway(hallwayDTO: IHallwayDTO): Promise<Result<{hallwayDTO: IHallwayDTO}>>;
  UpdateHallway(hallwayDTO: IHallwayDTO): Promise<Result<{hallwayDTO: IHallwayDTO}>>;
  existsHallwayswhithFloor(floorId: string): Promise<Result<boolean>>;
}
