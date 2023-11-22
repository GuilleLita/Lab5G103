"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotId = void 0;
const Entity_1 = require("../core/domain/Entity");
class RobotId extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    constructor(id) {
        super(null, id);
    }
}
exports.RobotId = RobotId;
//# sourceMappingURL=robotId.js.map