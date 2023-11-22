"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Floor = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const floorId_1 = require("./floorId");
const Guard_1 = require("../core/logic/Guard");
class Floor extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get floorId() {
        return floorId_1.FloorId.caller(this.id);
    }
    get name() {
        return this.props.floorName;
    }
    get description() {
        return this.props.description;
    }
    get buildingCode() {
        return this.props.buildingCode;
    }
    get height() {
        return this.props.height;
    }
    get width() {
        return this.props.width;
    }
    get rooms() {
        return this.props.rooms;
    }
    get grid() {
        /*
            GRID:
            -------------------------------
            Number |   0   |  N  |  Porta
               1   |  yes  | yes |  yes
               2   |  yes  | yes |  no
               3   |  yes  | no  |  yes
               4   |  yes  | no  |  no
               5   |  no   | yes |  yes
               6   |  no   | yes |  no
               7   |  no   | no  |  yes
               8   |  no   | no  |  no
            -------------------------------
        */
        return this.props.grid;
    }
    set name(value) {
        this.props.floorName = value;
    }
    set description(value) {
        this.props.description = value;
    }
    set buildingCode(value) {
        this.props.buildingCode = value;
    }
    set height(value) {
        this.props.height = value;
    }
    set width(value) {
        this.props.width = value;
    }
    set rooms(value) {
        this.props.rooms = value;
    }
    set grid(value) {
        this.props.grid = value;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const guardedProps = [
            { argument: props.floorName, argumentName: 'floorName' },
            { argument: props.description, argumentName: 'description' },
            { argument: props.buildingCode, argumentName: 'buildingCode' },
            { argument: props.height, argumentName: 'height' },
            { argument: props.width, argumentName: 'width' },
            { argument: props.rooms, argumentName: 'rooms' },
            { argument: props.grid, argumentName: 'grid' },
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        const floor = new Floor(Object.assign({}, props), id);
        return Result_1.Result.ok(floor);
    }
}
exports.Floor = Floor;
//# sourceMappingURL=floor.js.map