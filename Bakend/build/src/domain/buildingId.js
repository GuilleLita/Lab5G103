"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingId = void 0;
const Entity_1 = require("../core/domain/Entity");
class BuildingId extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    constructor(id) {
        super(null, id);
    }
}
exports.BuildingId = BuildingId;
//# sourceMappingURL=buildingId.js.map