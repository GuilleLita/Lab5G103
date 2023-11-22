"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const buildingRoute_1 = __importDefault(require("./routes/buildingRoute"));
const floorRoute_1 = __importDefault(require("./routes/floorRoute"));
const hallwayRoute_1 = __importDefault(require("./routes/hallwayRoute"));
const roomRoute_1 = __importDefault(require("./routes/roomRoute"));
const robotRoute_1 = __importDefault(require("./routes/robotRoute"));
const typerobotRoute_1 = __importDefault(require("./routes/typerobotRoute"));
const elevatorRoute_1 = __importDefault(require("./routes/elevatorRoute"));
exports.default = () => {
    const app = (0, express_1.Router)();
    (0, buildingRoute_1.default)(app);
    (0, floorRoute_1.default)(app);
    (0, hallwayRoute_1.default)(app);
    (0, roomRoute_1.default)(app);
    (0, robotRoute_1.default)(app);
    (0, typerobotRoute_1.default)(app);
    (0, elevatorRoute_1.default)(app);
    return app;
};
//# sourceMappingURL=index.js.map