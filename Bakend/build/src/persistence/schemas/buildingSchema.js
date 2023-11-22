"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BuildingSchema = new mongoose_1.default.Schema({
    buildingCode: { type: String, unique: true, required: true, maxLength: 5 },
    buildingName: { type: String },
    description: { type: String },
    height: { type: Number },
    width: { type: Number },
    numOfFloors: { type: Number },
    floors: [String],
    elevatorFloors: [String]
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Building', BuildingSchema);
//# sourceMappingURL=buildingSchema.js.map