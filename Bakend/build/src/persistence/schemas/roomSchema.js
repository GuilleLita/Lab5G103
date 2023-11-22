"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RoomSchema = new mongoose_1.default.Schema({
    roomId: { type: String, unique: true, required: true },
    buildingsId: { type: String },
    floorId: { type: String },
    position: [Number]
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Room', RoomSchema);
//# sourceMappingURL=roomSchema.js.map