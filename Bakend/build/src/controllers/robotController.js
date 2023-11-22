"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../config"));
let RobotController = class RobotController {
    constructor(robotServiceInstance) {
        this.robotServiceInstance = robotServiceInstance;
    }
    async createRobot(req, res, next) {
        try {
            const robotOrError = await this.robotServiceInstance.CreateRobot(req.body);
            if (robotOrError.isFailure) {
                return res.status(402).send();
            }
            const robotDTO = robotOrError.getValue();
            return res.json(robotDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
    async updateRobot(req, res, next) {
        try {
            const RobotOrError = await this.robotServiceInstance.updateRobot(req.body);
            if (RobotOrError.isFailure) {
                return res.status(404).send();
            }
            const robotDTO = RobotOrError.getValue();
            return res.status(201).json(robotDTO);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
    async inhibitRobot(req, res, next) {
        try {
            if (req.body.status) {
                req.body.status = 'inhibit';
            }
            const RobotOrError = await this.robotServiceInstance.inhibitRobot(req.body.robotId);
            if (RobotOrError.isFailure) {
                return res.status(402).send(RobotOrError.errorValue());
            }
            const robotDTO = RobotOrError.getValue();
            return res.status(201).json(robotDTO);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
    async desinhibitRobot(req, res, next) {
        try {
            const RobotOrError = await this.robotServiceInstance.desinhibitRobot(req.body.robotId);
            if (RobotOrError.isFailure) {
                return res.status(402).send(RobotOrError.errorValue());
            }
            const robotDTO = RobotOrError.getValue();
            return res.status(201).json(robotDTO);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
    async getAllRobots(req, res, next) {
        try {
            const robotOrError = await this.robotServiceInstance.getAllRobots();
            if (robotOrError.isFailure) {
                return res.status(404).send();
            }
            const robotDTO = robotOrError.getValue();
            return res.status(200).json(robotDTO);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
    async getRobotsByTask(req, res, next) {
        try {
            const robotOrError = await this.robotServiceInstance.getRobotsByTask(req.body.task);
            if (robotOrError.isFailure) {
                return res.status(401).send(robotOrError.errorValue());
            }
            const robotDTO = robotOrError.getValue();
            return res.status(200).json(robotDTO);
        }
        catch (e) {
            return next(e);
        }
    }
};
RobotController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.robot.name)),
    __metadata("design:paramtypes", [Object])
], RobotController);
exports.default = RobotController;
//# sourceMappingURL=robotController.js.map