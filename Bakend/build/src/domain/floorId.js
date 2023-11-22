"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorId = void 0;
const Entity_1 = require("../core/domain/Entity");
class FloorId extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    constructor(id) {
        super(null, id);
    }
}
exports.FloorId = FloorId;
//# sourceMappingURL=floorId.js.map