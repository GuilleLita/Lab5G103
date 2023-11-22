"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const building_1 = require("../domain/building");
class BuildingMap extends Mapper_1.Mapper {
    static toDTO(building) {
        return {
            buildingCode: building.buildingCode,
            buildingName: building.name,
            description: building.description,
            height: building.height,
            width: building.width,
            numOfFloors: building.numOfFloors,
            floors: building.floors,
            elevatorFloors: building.elevatorFloors
        };
    }
    static async toDomain(raw) {
        const buildingOrError = building_1.Building.create({
            buildingCode: raw.buildingCode,
            buildingName: raw.buildingName,
            description: raw.description,
            height: raw.height,
            width: raw.width,
            numOfFloors: raw.numOfFloors,
            floors: raw.floors,
            elevatorFloors: raw.elevatorFloors
        });
        buildingOrError.isFailure ? console.log(buildingOrError.error) : '';
        return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
    }
    static toPersistence(building) {
        const a = {
            buildingCode: building.buildingCode,
            buildingName: building.name,
            description: building.description,
            height: building.height,
            width: building.width,
            numOfFloors: building.numOfFloors,
            floors: building.floors,
            elevatorFloors: building.elevatorFloors
        };
        return a;
    }
}
exports.BuildingMap = BuildingMap;
//# sourceMappingURL=BuildingMap.js.map