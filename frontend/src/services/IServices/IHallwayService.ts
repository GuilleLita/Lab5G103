import { Result } from "../../core/logic/Result";
import { Hallway } from "../../domain/hallway";
import { IHallwayDTO } from "../../dto/IHallwayDTO";

export default interface IHallwayService  {
  CreateHallway(hallwayDTO: IHallwayDTO): Promise<Result<{hallwayDTO: IHallwayDTO}>>;
  //updateHallway(hallwayDTO: IHallwayDTO): Promise<Result<{hallwayDTO: IHallwayDTO}>>;
  //getBetweenBuildings(building1: string, building2: string): Promise<Result<{hallwayDTO: IHallwayDTO[]}>>;
}
