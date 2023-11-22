"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ElevatorSchema = new mongoose_1.default.Schema({
    elevatorId: { type: String, unique: true, required: true },
    buildingId: { type: String },
    floorId: { type: String },
    position: [Number]
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Elevator', ElevatorSchema);
//# sourceMappingURL=elevatorSchema.js.map