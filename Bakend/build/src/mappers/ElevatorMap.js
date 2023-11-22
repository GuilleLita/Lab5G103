"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElevatorMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const elevator_1 = require("../domain/elevator");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class ElevatorMap extends Mapper_1.Mapper {
    static toDTO(elevator) {
        return {
            elevatorId: elevator.id.toString(),
            buildingId: elevator.buildingId,
            floorId: elevator.floorId,
            position: elevator.position
        };
    }
    static async toDomain(raw) {
        const elevatorOrError = elevator_1.Elevator.create({
            buildingId: raw.buildingId,
            floorId: raw.floorId,
            position: raw.position
        }, new UniqueEntityID_1.UniqueEntityID(raw.elevatorId));
        elevatorOrError.isFailure ? console.log(elevatorOrError.error) : '';
        return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
    }
    static toPersistence(elevator) {
        const a = {
            elevatorId: elevator.id.toString(),
            buildingId: elevator.buildingId,
            floorId: elevator.floorId,
            position: elevator.position
        };
        return a;
    }
}
exports.ElevatorMap = ElevatorMap;
//# sourceMappingURL=ElevatorMap.js.map