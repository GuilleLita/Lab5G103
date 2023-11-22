"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hallway = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const hallwayId_1 = require("./hallwayId");
const Guard_1 = require("../core/logic/Guard");
class Hallway extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get hallwayId() {
        return hallwayId_1.HallwayId.caller(this.id);
    }
    get buildingsCode() {
        return this.props.buildingsCode;
    }
    get floorsId() {
        return this.props.floorsId;
    }
    get position() {
        return this.props.position;
    }
    set position(value) {
        this.props.position = value;
    }
    set floorsId(value) {
        this.props.floorsId = value;
    }
    set buildingsCode(value) {
        this.props.buildingsCode = value;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const guardedProps = [
            //{ argument: props.hallwayId, argumentName: 'hallwayId' },
            { argument: props.buildingsCode, argumentName: 'buildingsCode' },
            { argument: props.floorsId, argumentName: 'floorsId' },
            { argument: props.position, argumentName: 'position' }
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        const hallway = new Hallway(Object.assign({}, props), id);
        return Result_1.Result.ok(hallway);
    }
}
exports.Hallway = Hallway;
//# sourceMappingURL=hallway.js.map