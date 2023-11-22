"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const robot_1 = require("../domain/robot");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class RobotMap extends Mapper_1.Mapper {
    static toDTO(robot) {
        return {
            robotId: robot.id.toString(),
            robotType: robot.robotType,
            currentlytask: robot.currentlytask,
            currentlyPosition: robot.currentlyPosition,
            destinationPosition: robot.destinationPosition,
            status: robot.status
        };
    }
    static async toDomain(raw) {
        const robotOrError = robot_1.Robot.create({
            robotId: raw.robotId,
            robotType: raw.robotType,
            currentlytask: raw.currentlytask,
            currentlyPosition: raw.currentlyPosition,
            destinationPosition: raw.destinationPosition,
            status: raw.status,
        }, new UniqueEntityID_1.UniqueEntityID(raw.robotId));
        robotOrError.isFailure ? console.log(robotOrError.error) : '';
        return robotOrError.isSuccess ? robotOrError.getValue() : null;
    }
    static toPersistence(robot) {
        const a = {
            robotId: robot.id.toString(),
            robotType: robot.robotType,
            currentlytask: robot.currentlytask,
            currentlyPosition: robot.currentlyPosition,
            destinationPosition: robot.destinationPosition,
            status: robot.status
        };
        return a;
    }
}
exports.RobotMap = RobotMap;
//# sourceMappingURL=RobotMap.js.map