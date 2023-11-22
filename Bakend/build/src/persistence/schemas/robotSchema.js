"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RobotSchema = new mongoose_1.default.Schema({
    robotId: { type: String, unique: true, required: true },
    robotType: { type: String,
        default: 'typerobot' },
    mark: { type: String },
    model: { type: String },
    currentlytask: { type: String },
    currentlyPosition: [String],
    destinationPosition: [String],
    status: { type: String }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Robot', RobotSchema);
//# sourceMappingURL=robotSchema.js.map