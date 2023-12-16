import { Service } from "typedi";
import IBuildingService from "./IServices/IBuildingService";
import config from "../config";
import { IBuildingDTO } from "../dto/IBuildingDTO";
import { BuildingMap } from "../mappers/BuildingMap";
import { Result } from "../core/logic/Result";


@Service()
export default class buildingService implements IBuildingService{

    private static _instance : buildingService;

    private constructor(){}

    public static get instance() {
        return this._instance ?? (this._instance = new buildingService())
    }

    public async getBuildings () : Promise<Result<{ buildingDTO: IBuildingDTO[]; }>>{

        try {
            const res = await fetch(config.ServerURL + '/api/building/getall');
            const Buildings = await res.json().then((data) => {
                return data.buildingDTO;
            });
            console.log(Buildings);
            
            if (Buildings === null) {
              return Result.fail<{buildingDTO: IBuildingDTO[]}>("Building not found");
            }
            else {
              return Result.ok<{buildingDTO: IBuildingDTO[]}>( {buildingDTO: Buildings} )
              }
          } catch (e) {
            throw e;
          }
    }
}