"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FloorSchema = new mongoose_1.default.Schema({
    floorId: { type: String, unique: true, required: true },
    floorName: { type: String },
    buildingCode: { type: String },
    description: { type: String },
    height: { type: Number },
    width: { type: Number },
    rooms: [String],
    grid: [[Number]],
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Floor', FloorSchema);
//# sourceMappingURL=floorSchema.js.map