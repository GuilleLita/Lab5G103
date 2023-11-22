"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HallwayMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const hallway_1 = require("../domain/hallway");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class HallwayMap extends Mapper_1.Mapper {
    static toDTO(hallway) {
        return {
            hallwayId: hallway.id.toString(),
            buildingsCode: hallway.buildingsCode,
            floorsId: hallway.floorsId,
            position: hallway.position
        };
    }
    static async toDomain(raw) {
        const hallwayOrError = hallway_1.Hallway.create({
            buildingsCode: raw.buildingsCode,
            floorsId: raw.floorsId,
            position: raw.position
        }, new UniqueEntityID_1.UniqueEntityID(raw.hallwayId));
        hallwayOrError.isFailure ? console.log(hallwayOrError.error) : '';
        return hallwayOrError.isSuccess ? hallwayOrError.getValue() : null;
    }
    static toPersistence(hallway) {
        const a = {
            hallwayId: hallway.id.toString(),
            buildingsCode: hallway.buildingsCode,
            floorsId: hallway.floorsId,
            position: hallway.position
        };
        return a;
    }
}
exports.HallwayMap = HallwayMap;
//# sourceMappingURL=HallwayMap.js.map