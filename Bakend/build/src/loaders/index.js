"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const dependencyInjector_1 = __importDefault(require("./dependencyInjector"));
const mongoose_1 = __importDefault(require("./mongoose"));
const logger_1 = __importDefault(require("./logger"));
const config_1 = __importDefault(require("../../config"));
exports.default = async ({ expressApp }) => {
    const mongoConnection = await (0, mongoose_1.default)();
    logger_1.default.info('✌️ DB loaded and connected!');
    const buildingSchema = {
        name: 'buildingSchema',
        schema: '../persistence/schemas/buildingSchema',
    };
    const typerobotSchema = {
        name: 'typerobotSchema',
        schema: '../persistence/schemas/typerobotSchema',
    };
    const robotSchema = {
        name: 'robotSchema',
        schema: '../persistence/schemas/robotSchema',
    };
    const hallwaySchema = {
        name: 'hallwaySchema',
        schema: '../persistence/schemas/hallwaySchema',
    };
    const floorSchema = {
        name: 'floorSchema',
        schema: '../persistence/schemas/floorSchema',
    };
    const roomSchema = {
        name: 'roomSchema',
        schema: '../persistence/schemas/roomSchema',
    };
    const elevatorSchema = {
        name: 'elevatorSchema',
        schema: '../persistence/schemas/elevatorSchema',
    };
    const hallwayService = {
        name: config_1.default.services.hallway.name,
        path: config_1.default.services.hallway.path
    };
    const typerobotService = {
        name: config_1.default.services.typerobot.name,
        path: config_1.default.services.typerobot.path
    };
    const robotService = {
        name: config_1.default.services.robot.name,
        path: config_1.default.services.robot.path
    };
    const hallwayRepo = {
        name: config_1.default.repos.hallway.name,
        path: config_1.default.repos.hallway.path
    };
    const typerobotRepo = {
        name: config_1.default.repos.typerobot.name,
        path: config_1.default.repos.typerobot.path
    };
    const robotRepo = {
        name: config_1.default.repos.robot.name,
        path: config_1.default.repos.robot.path
    };
    const elevatorService = {
        name: config_1.default.services.elevator.name,
        path: config_1.default.services.elevator.path
    };
    const elevatorRepo = {
        name: config_1.default.repos.elevator.name,
        path: config_1.default.repos.elevator.path
    };
    const roomRepo = {
        name: config_1.default.repos.room.name,
        path: config_1.default.repos.room.path
    };
    const roomService = {
        name: config_1.default.services.room.name,
        path: config_1.default.services.room.path
    };
    const robotController = {
        name: config_1.default.controllers.robot.name,
        path: config_1.default.controllers.robot.path
    };
    const typeRobotController = {
        name: config_1.default.controllers.typerobot.name,
        path: config_1.default.controllers.typerobot.path
    };
    const elevatorController = {
        name: config_1.default.controllers.elevator.name,
        path: config_1.default.controllers.elevator.path
    };
    const hallwayController = {
        name: config_1.default.controllers.hallway.name,
        path: config_1.default.controllers.hallway.path
    };
    const buildingController = {
        name: config_1.default.controllers.building.name,
        path: config_1.default.controllers.building.path
    };
    const buildingRepo = {
        name: config_1.default.repos.building.name,
        path: config_1.default.repos.building.path
    };
    const buildingService = {
        name: config_1.default.services.building.name,
        path: config_1.default.services.building.path
    };
    const floorService = {
        name: config_1.default.services.floor.name,
        path: config_1.default.services.floor.path
    };
    const floorRepo = {
        name: config_1.default.repos.floor.name,
        path: config_1.default.repos.floor.path
    };
    const floorController = {
        name: config_1.default.controllers.floor.name,
        path: config_1.default.controllers.floor.path
    };
    await (0, dependencyInjector_1.default)({
        mongoConnection,
        schemas: [
            buildingSchema,
            floorSchema,
            hallwaySchema,
            roomSchema,
            elevatorSchema,
            robotSchema,
            typerobotSchema
        ],
        controllers: [
            buildingController,
            robotController,
            floorController,
            typeRobotController,
            elevatorController,
            hallwayController
        ],
        repos: [
            buildingRepo,
            floorRepo,
            hallwayRepo,
            roomRepo,
            elevatorRepo,
            robotRepo,
            typerobotRepo
        ],
        services: [
            buildingService,
            floorService,
            hallwayService,
            roomService,
            elevatorService,
            robotService,
            typerobotService
        ]
    });
    logger_1.default.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');
    await (0, express_1.default)({ app: expressApp });
    logger_1.default.info('✌️ Express loaded');
};
//# sourceMappingURL=index.js.map