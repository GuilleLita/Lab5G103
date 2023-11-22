"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElevatorId = void 0;
const Entity_1 = require("../core/domain/Entity");
class ElevatorId extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    constructor(id) {
        super(null, id);
    }
}
exports.ElevatorId = ElevatorId;
//# sourceMappingURL=elevatorId.js.map