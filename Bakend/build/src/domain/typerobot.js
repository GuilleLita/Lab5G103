"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeRobot = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
class TypeRobot extends AggregateRoot_1.AggregateRoot {
    get robotType() {
        return this.props.robotType;
    }
    get mark() {
        return this.props.mark;
    }
    get model() {
        return this.props.model;
    }
    get taskspermited() {
        return this.props.taskspermited;
    }
    set robotType(value) {
        this.props.robotType = value;
    }
    set mark(value) {
        this.props.mark = value;
    }
    set model(value) {
        this.props.model = value;
    }
    set taskspermited(value) {
        this.props.taskspermited = value;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(typerobotDTO, id) {
        const type = typerobotDTO.robotType;
        const mark = typerobotDTO.mark;
        const model = typerobotDTO.model;
        const taskspermited = typerobotDTO.taskspermited;
        if (!!type === false || type.length === 0) {
            return Result_1.Result.fail('Must provide a type name');
        }
        else {
            const typero = new TypeRobot({ robotType: type, mark: mark, model: model, taskspermited: taskspermited }, id);
            return Result_1.Result.ok(typero);
        }
    }
}
exports.TypeRobot = TypeRobot;
//# sourceMappingURL=typerobot.js.map