"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const HallwaySchema = new mongoose_1.default.Schema({
    hallwayId: { type: String, unique: true, required: true },
    buildingsCode: [String],
    floorsId: [String],
    position: [Number]
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Hallway', HallwaySchema);
//# sourceMappingURL=hallwaySchema.js.map