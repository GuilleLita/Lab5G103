import { Service } from "typedi";
import IElevatorService from "./IServices/IElevatorService";
import config from "../config";
import { IElevatorDTO } from "../dto/IElevatorDTO";
import { Result } from "../core/logic/Result";

@Service()
export default class elevatorService implements IElevatorService{

    private static _instance : elevatorService;
    
    private constructor(){}

    public static get instance() {
        return this._instance ?? (this._instance = new elevatorService())
    }

    public async getElevatorsByBuilding (code: string) : Promise<Result<{ elevatorDTO: IElevatorDTO[]; }>>{
            
            try {
                const res = await fetch(config.ServerURL + '/api/elevator/getall/' + code);
                const Elevators = await res.json().then((data) => {
                    return data.elevatorDTO;
                });
                //console.log(Elevators);
                
                if (Elevators === null) {
                return Result.fail<{elevatorDTO: IElevatorDTO[]}>("Elevator not found");
                }
                else {
                return Result.ok<{elevatorDTO: IElevatorDTO[]}>( {elevatorDTO: Elevators} )
                }
            } catch (e) {
                throw e;
            }
        }

}