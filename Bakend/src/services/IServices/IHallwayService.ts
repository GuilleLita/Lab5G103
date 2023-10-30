import { Result } from "../../core/logic/Result";
import { IHallwayDTO } from "../../dto/IHallwayDTO";

export default interface IHallwayService  {
  CreateHallway(hallwayDTO: IHallwayDTO): Promise<Result<{hallwayDTO: IHallwayDTO}>>;

}
