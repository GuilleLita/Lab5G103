"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Building = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const Guard_1 = require("../core/logic/Guard");
class Building extends AggregateRoot_1.AggregateRoot {
    get buildingCode() {
        return this.props.buildingCode;
    }
    get name() {
        return this.props.buildingName;
    }
    get description() {
        return this.props.description;
    }
    get height() {
        return this.props.height;
    }
    get width() {
        return this.props.width;
    }
    get numOfFloors() {
        return this.props.numOfFloors;
    }
    get floors() {
        return this.props.floors;
    }
    get elevatorFloors() {
        return this.props.elevatorFloors;
    }
    set name(value) {
        this.props.buildingName = value;
    }
    set description(value) {
        this.props.description = value;
    }
    set height(value) {
        this.props.height = value;
    }
    set width(value) {
        this.props.width = value;
    }
    set numOfFloors(value) {
        this.props.numOfFloors = value;
    }
    set floors(value) {
        this.props.floors = value;
    }
    set elevatorFloors(value) {
        this.props.elevatorFloors = value;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const guardedProps = [
            { argument: props.buildingName, argumentName: 'buildingName' },
            { argument: props.description, argumentName: 'description' },
            { argument: props.height, argumentName: 'height' },
            { argument: props.width, argumentName: 'width' },
            { argument: props.numOfFloors, argumentName: 'numOfFloors' },
            { argument: props.floors, argumentName: 'floors' },
            { argument: props.elevatorFloors, argumentName: 'elevatorFloors' }
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        const building = new Building(Object.assign({}, props), id);
        return Result_1.Result.ok(building);
    }
}
exports.Building = Building;
//# sourceMappingURL=building.js.map