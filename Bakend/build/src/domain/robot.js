"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const Guard_1 = require("../core/logic/Guard");
class Robot extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get robotType() {
        return this.props.robotType;
    }
    get currentlytask() {
        return this.props.currentlytask;
    }
    get currentlyPosition() {
        return this.props.currentlyPosition;
    }
    get destinationPosition() {
        return this.props.destinationPosition;
    }
    get status() {
        return this.props.status;
    }
    set robotType(value) {
        this.props.robotType = value;
    }
    set currentlytask(value) {
        this.props.currentlytask = value;
    }
    set currentlyPosition(value) {
        this.props.currentlyPosition = value;
    }
    set destinationPosition(value) {
        this.props.destinationPosition = value;
    }
    set status(value) {
        this.props.status = value;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const guardedProps = [
            { argument: props.robotType, argumentName: 'robotType' },
            { argument: props.currentlytask, argumentName: 'currentlytask' },
            { argument: props.currentlyPosition, argumentName: 'currentlyPosition' },
            { argument: props.destinationPosition, argumentName: 'destinationPosition' },
            { argument: props.status, argumentName: 'status' }
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        const robot = new Robot(Object.assign({}, props), id);
        return Result_1.Result.ok(robot);
    }
}
exports.Robot = Robot;
//# sourceMappingURL=robot.js.map