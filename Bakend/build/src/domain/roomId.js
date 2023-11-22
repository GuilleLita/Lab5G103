"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomId = void 0;
const Entity_1 = require("../core/domain/Entity");
class RoomId extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    constructor(id) {
        super(null, id);
    }
}
exports.RoomId = RoomId;
//# sourceMappingURL=roomId.js.map