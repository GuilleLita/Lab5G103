"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeRobotMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const typerobot_1 = require("../domain/typerobot");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class TypeRobotMap extends Mapper_1.Mapper {
    static toDTO(typerobot) {
        return {
            robotType: typerobot.robotType,
            mark: typerobot.mark,
            model: typerobot.model,
            taskspermited: typerobot.taskspermited
        };
    }
    static toDomain(typerobot) {
        const typerobotOrError = typerobot_1.TypeRobot.create(typerobot, new UniqueEntityID_1.UniqueEntityID(typerobot.domainId));
        typerobotOrError.isFailure ? console.log(typerobotOrError.error) : '';
        return typerobotOrError.isSuccess ? typerobotOrError.getValue() : null;
    }
    static toPersistence(typerobot) {
        return {
            robotType: typerobot.robotType,
            mark: typerobot.mark,
            model: typerobot.model,
            taskspermited: typerobot.taskspermited
        };
    }
}
exports.TypeRobotMap = TypeRobotMap;
//# sourceMappingURL=TypeRobotMap.js.map