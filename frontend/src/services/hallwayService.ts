import IHallwayService from "./IServices/IHallwayService";
import config from "../config";
import { IHallwayDTO } from "../dto/IHallwayDTO";
import { Result } from "../core/logic/Result";
import { Hallway } from "../domain/hallway";


export class hallwayService implements IHallwayService{
    private static _instance : hallwayService;

    private constructor(){}

    public static get instance() {
        return this._instance ?? (this._instance = new hallwayService())
    }

    public async CreateHallway(hallway: IHallwayDTO): Promise<Result<{hallwayDTO: IHallwayDTO}>> {

        try {
            console.log(JSON.stringify(hallway));
            const res = await fetch(config.ServerURL + '/api/hallway/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(hallway)
                });
            if(res.status === 201){
                const data = await res.json();
                return data;
            }
            else{

                return Result.fail<{hallwayDTO: IHallwayDTO}>(await res.text());
            }
        } catch (e) {
            throw e;
        }
    }

    
}