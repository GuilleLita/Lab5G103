import { Inject } from 'typedi';
import config from '../config';
import IBuildingService from '../services/IServices/IBuildingService';
import { Result } from '../core/logic/Result';
import { IBuildingDTO } from '../dto/IBuildingDTO';
import IElevatorService from '../services/IServices/IElevatorService';




export default class ListElevatorViewModel {

    constructor(
        @Inject(config.services.building.name) private buildingService : IBuildingService,
        @Inject(config.services.elevator.name) private elevator : IElevatorService
        )
    {}; 



    public async searchElevators (buildingName: string) {
        let elevators: any[] = [];
        let buildings = (await this.buildingService.getBuildings()).getValue().buildingDTO;
        let buildingCode = "";
        for (let i = 0; i < buildings.length; i++) {
            if (buildings[i].buildingName === buildingName) {
                buildingCode = buildings[i].buildingCode;
                break;
            }
        }
        console.log(buildingCode);
        const res = await fetch(config.ServerURL + '/api/elevator/getbybuilding?buildingCode=' + buildingCode);
        const data = await res.json();
        for (let i = 0; i < data.elevatorDTO.length; i++) {
            elevators.push(data.elevatorDTO[i]);
        }
        console.log(elevators);
        return elevators;
    }

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
}