
import config from '../config'
import { Service, Inject} from 'typedi';

import IBuildingService from '../services/IServices/IBuildingService';
import IHallwayService from '../services/IServices/IHallwayService';

import { IHallwayDTO } from '../dto/IHallwayDTO';
import { Result } from '../core/logic/Result';
import { IBuildingDTO } from '../dto/IBuildingDTO';


export default class AddHallwayViewModel 
{
    constructor(
        @Inject(config.services.building.name) private buildingService : IBuildingService,
        @Inject(config.services.hallway.name) private hallwayService : IHallwayService
        )

    {};


    public async searchBuildings () {
        let buildings: any[] = [];
        let buildingsOrError = (await this.buildingService.getBuildings());
        if (buildingsOrError.isFailure) {
            return [];
        }
        let data = buildingsOrError.getValue().buildingDTO;
        for (let i = 0; i < data.length; i++) {
            buildings.push({ value: data[i].buildingName, label: data[i].buildingName });
        }
        return buildings;
    }

    public async searchFloors (buildingName: string) {
        let floors: any[] = [];
        console.log(buildingName);
        let buildingsOrError = (await this.buildingService.getBuildings());
        if (buildingsOrError.isFailure) {
            return [];
        }
        let buildings = buildingsOrError.getValue().buildingDTO;
        for (let i = 0; i < buildings.length; i++) {
            if (buildings[i].buildingName === buildingName) {
                floors = buildings[i].floors;
                break;
            }
        }
        let retVal: any[] = [];
        for (let i = 0; i < floors.length; i++) {
            retVal.push({ value: floors[i], label: floors[i] });
            
        }
        
        return retVal;
    }


    public async getCodes (building1: string, building2: string){
        let buildingsOrError = (await this.buildingService.getBuildings());
        if (buildingsOrError.isFailure) {
            return [];
        }
        let buildings = buildingsOrError.getValue().buildingDTO;
        let retVal: string[] = []
        for(let i = 0; i < buildings.length; i++ ){
            if(buildings[i].buildingName === building1 || buildings[i].buildingName === building2){
                retVal.push(buildings[i].buildingCode)
            }
        }
        return retVal
    }


    public async setHallway (building1: string, building2: string, floor1: string, floor2: string, position1: string, position2: string): Promise<Result<{hallwayDTO: IHallwayDTO}>>{
        let buildingCodes: string[] = await this.getCodes(building1, building2)
        
        
        let hallway = 
            {buildingsCode: buildingCodes,
                 floorsId: [floor1, floor2], 
                 position: [parseInt(position1), parseInt(position2)]} as IHallwayDTO;

        return this.hallwayService.CreateHallway(hallway);
        
    }


    public async fetchBuildings() : Promise<any[]>{
        var buildings: IBuildingDTO[] = [];
        var retval : any[] = [];
        const data = await this.buildingService.getBuildings();
        buildings = data.getValue().buildingDTO;
        for (let i = 0; i < buildings.length; i++) {
            retval.push({ value: buildings[i].buildingName, label: buildings[i].buildingName });
        }
    
        return retval;
    }
}

