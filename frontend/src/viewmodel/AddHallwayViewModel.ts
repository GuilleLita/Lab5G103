
import config from '../config'
import { Service, Inject} from 'typedi';

import IBuildingService from '../services/IServices/IBuildingService';
import IHallwayService from '../services/IServices/IHallwayService';

import { IHallwayDTO } from '../dto/IHallwayDTO';
import { Result } from '../core/logic/Result';


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

    //Esto al service, mas o menso
    /*public async OnClickListner(){
        let buildingCodes: string[] = await this.getCodes(selected.value, selected2.value)
        if (position1.current !== null && position2.current !== null) {
            let input1 = position1.current.value
            let input2 = position2.current.value
        
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ buildingsCode: buildingCodes, floorsId: [floorSelected.value, floorSelected2.value], position: [input1, input2] })
            };
            fetch( config.ServerURL +'/api/hallway/create', requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
        
                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    alert("Hallway created")
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }*/

}

