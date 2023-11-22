"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elevator = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const Guard_1 = require("../core/logic/Guard");
class Elevator extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get buildingId() {
        return this.props.buildingId;
    }
    get floorId() {
        return this.props.floorId;
    }
    get position() {
        return this.props.position;
    }
    set position(value) {
        this.props.position = value;
    }
    set floorId(value) {
        this.props.floorId = value;
    }
    set buildingId(value) {
        this.props.buildingId = value;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const guardedProps = [
            //{ argument: props.elevatorId, argumentName: 'ElevatorId' },
            { argument: props.buildingId, argumentName: 'buildingId' },
            { argument: props.floorId, argumentName: 'floorId' },
            { argument: props.position, argumentName: 'position' }
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        const elevator = new Elevator(Object.assign({}, props), id);
        return Result_1.Result.ok(elevator);
    }
}
exports.Elevator = Elevator;
//# sourceMappingURL=elevator.js.map