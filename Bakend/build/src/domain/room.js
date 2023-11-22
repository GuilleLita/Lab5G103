"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const Guard_1 = require("../core/logic/Guard");
class Room extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get roomId() {
        return this.props.roomId;
    }
    get buildingsId() {
        return this.props.buildingsId;
    }
    get floorId() {
        return this.props.roomId;
    }
    get position() {
        return this.props.position;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const guardedProps = [
            { argument: props.roomId, argumentName: 'roomId' },
            { argument: props.buildingsId, argumentName: 'buildingsId' },
            { argument: props.floorId, argumentName: 'floorId' },
            { argument: props.position, argumentName: 'position' }
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        const room = new Room(Object.assign({}, props), id);
        return Result_1.Result.ok(room);
    }
}
exports.Room = Room;
//# sourceMappingURL=room.js.map