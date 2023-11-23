"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv_1.default.config();
if (!envFound) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
exports.default = {
    /**
     * Your favorite port : optional change to 4000 by JRT
     */
    port: parseInt(process.env.PORT, 10) || 4000,
    /**
     * That long string from mlab
     */
    databaseURL: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/testing",
    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET || "the bv98165uebfbai3biabil sauce fun",
    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'info',
    },
    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },
    controllers: {
        building: {
            name: "BuildingController",
            path: "../controllers/buildingController"
        },
        robot: {
            name: "RobotController",
            path: "../controllers/robotController"
        },
        floor: {
            name: "FloorController",
            path: "../controllers/floorController"
        },
        typerobot: {
            name: "TypeRobotController",
            path: "../controllers/typeRobotController"
        },
        elevator: {
            name: "ElevatorController",
            path: "../controllers/elevatorController"
        },
        hallway: {
            name: "HallwayController",
            path: "../controllers/hallwayController"
        },
    },
    repos: {
        building: {
            name: "BuildingRepo",
            path: "../repos/buildingRepo"
        },
        floor: {
            name: "FloorRepo",
            path: "../repos/floorRepo"
        },
        hallway: {
            name: "HallwayRepo",
            path: "../repos/hallwayRepo"
        },
        room: {
            name: "RoomRepo",
            path: "../repos/roomRepo"
        },
        elevator: {
            name: "ElevatorRepo",
            path: "../repos/elevatorRepo"
        },
        robot: {
            name: "RobotRepo",
            path: "../repos/robotRepo"
        },
        typerobot: {
            name: "TypeRobotRepo",
            path: "../repos/typeRobotRepo"
        }
    },
    services: {
        building: {
            name: "BuildingService",
            path: "../services/buildingService"
        },
        floor: {
            name: "FloorService",
            path: "../services/floorService"
        },
        hallway: {
            name: "HallwayService",
            path: "../services/hallwayService"
        },
        room: {
            name: "RoomService",
            path: "../services/roomService"
        },
        elevator: {
            name: "ElevatorService",
            path: "../services/elevatorService"
        },
        robot: {
            name: "RobotService",
            path: "../services/robotService"
        },
        typerobot: {
            name: "TypeRobotService",
            path: "../services/typeRobotService"
        }
    },
};
//# sourceMappingURL=config.js.map