"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HallwayId = void 0;
const Entity_1 = require("../core/domain/Entity");
class HallwayId extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    constructor(id) {
        super(null, id);
    }
}
exports.HallwayId = HallwayId;
//# sourceMappingURL=hallwayId.js.map