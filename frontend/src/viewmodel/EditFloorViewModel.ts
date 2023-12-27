import IBuildingService from "../services/IServices/IBuildingService";
import IHallwayService  from "../services/IServices/IHallwayService";

import { Inject } from "typedi";
import config from "../config";
import IFloorService from "../services/IServices/IFloorService";
import { Floor } from "../domain/floor";
import { IBuildingDTO } from "../dto/IBuildingDTO";
import { Result } from "../core/logic/Result";
import { IFloorDTO } from "../dto/IFloorDTO";
import { FloorMap } from "../mappers/FloorMap";
import { isConstructorDeclaration } from "typescript";

export default class EditFloorViewModel {

    constructor(
        @Inject(config.services.building.name) private buildingService : IBuildingService,
        @Inject(config.services.floor.name) private floorService : IFloorService
        )
    {}; 
    
    public async FloorWithNewGrid(floorSelected: any, newGrid: number[][]): Promise<Floor> {
        let floorOrError = Floor.create({floorName: floorSelected.floorName,
            description: floorSelected.description,
            buildingCode: floorSelected.buildingCode,
            height: floorSelected.height,
            width:floorSelected.width, rooms:floorSelected.rooms,
            grid: newGrid});

        if (floorOrError.isFailure) {
            return null;
        }
        let floor = floorOrError.getValue();
        console.log(floor);
        return floor;
    }

    public async updateFloor(floor: Floor): Promise<boolean> {
        let floorDTO = FloorMap.toDTO(floor);
        let floorOrError = await this.floorService.updateFloor(floorDTO);
        if (floorOrError.isFailure) {
            return false;
        }
        return true;
        
    }

    public async getFloorbyName(floorName: string): Promise<Floor> { 
        let floorOrError = await this.floorService.getFloorByName(floorName);
        if (floorOrError.isFailure) {
            return null;
        }
        let floor = floorOrError.getValue().floorDTO;
        
        return FloorMap.toDomain(floor);
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

    public async getBuildings () {
        let buildingsOrError = (await this.buildingService.getBuildings());
        if (buildingsOrError.isFailure) {
            return [];
        }
        let data = buildingsOrError.getValue().buildingDTO;
        return data;
    }

}