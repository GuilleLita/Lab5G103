"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const floor_1 = require("../domain/floor");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class FloorMap extends Mapper_1.Mapper {
    static toDTO(Floor) {
        return {
            //floorId: Floor.id.toString(),
            floorName: Floor.name,
            description: Floor.description,
            buildingCode: Floor.buildingCode,
            height: Floor.height,
            width: Floor.width,
            rooms: Floor.rooms,
            grid: Floor.grid
        };
    }
    static async toDomain(raw) {
        const floorOrError = floor_1.Floor.create({
            floorName: raw.floorName,
            description: raw.description,
            buildingCode: raw.buildingCode,
            height: raw.height,
            width: raw.width,
            rooms: raw.rooms,
            grid: raw.grid
        }, new UniqueEntityID_1.UniqueEntityID(raw.floorId));
        floorOrError.isFailure ? console.log(floorOrError.error) : '';
        return floorOrError.isSuccess ? floorOrError.getValue() : null;
    }
    static toPersistence(floor) {
        const a = {
            floorId: floor.id.toString(),
            floorName: floor.name,
            description: floor.description,
            buildingCode: floor.buildingCode,
            height: floor.height,
            width: floor.width,
            rooms: floor.rooms,
            grid: floor.grid
        };
        return a;
    }
}
exports.FloorMap = FloorMap;
//# sourceMappingURL=FloorMap.js.map