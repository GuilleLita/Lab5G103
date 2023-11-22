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
const RobotMap_1 = require("../mappers/RobotMap");
const robot_1 = require("../domain/robot");
const Result_1 = require("../core/logic/Result");
let RobotService = class RobotService {
    constructor(robotRepo, typerobotRepo, 
    //@Inject(config.repos.Building.name) private BuildingRepo : IBuildingRepo,
    logger) {
        this.robotRepo = robotRepo;
        this.typerobotRepo = typerobotRepo;
        this.logger = logger;
    }
    async CreateRobot(robotDTO) {
        const robotOrError = await robot_1.Robot.create({
            robotId: robotDTO.robotId,
            robotType: robotDTO.robotType,
            currentlytask: robotDTO.currentlytask,
            currentlyPosition: robotDTO.currentlyPosition,
            destinationPosition: robotDTO.destinationPosition,
            status: robotDTO.status
        });
        if (robotOrError.isFailure) {
            throw Result_1.Result.fail(robotOrError.errorValue());
        }
        const robotResult = robotOrError.getValue();
        await this.robotRepo.save(robotResult);
        const robotDTOResult = RobotMap_1.RobotMap.toDTO(robotResult);
        return Result_1.Result.ok({ robotDTO: robotDTOResult });
    }
    async updateRobot(robotDTO) {
        try {
            const Robot = await this.robotRepo.findByDomainId(robotDTO.robotId);
            if (Robot === null) {
                return Result_1.Result.fail("Robot not found");
            }
            else {
                Robot.currentlytask = robotDTO.currentlytask;
                Robot.currentlyPosition = robotDTO.currentlyPosition;
                Robot.destinationPosition = robotDTO.destinationPosition;
                Robot.status = robotDTO.status;
                await this.robotRepo.save(Robot);
                const RobotDTOResult = RobotMap_1.RobotMap.toDTO(Robot);
                return Result_1.Result.ok({ robotDTO: RobotDTOResult });
            }
        }
        catch (e) {
            throw e;
        }
    }
    async desinhibitRobot(robotId) {
        try {
            const Robot = await this.robotRepo.findByDomainId(robotId);
            if (Robot === null) {
                return Result_1.Result.fail("Robot not found");
            }
            Robot.status = 'working';
            await this.robotRepo.save(Robot);
            const RobotDTOResult = RobotMap_1.RobotMap.toDTO(Robot);
            return Result_1.Result.ok({ robotDTO: RobotDTOResult });
        }
        catch (e) {
            throw e;
        }
    }
    async inhibitRobot(robotId) {
        try {
            const Robot = await this.robotRepo.findByDomainId(robotId);
            if (Robot === null) {
                return Result_1.Result.fail("Robot not found");
            }
            Robot.status = 'inhibit';
            await this.robotRepo.save(Robot);
            const RobotDTOResult = RobotMap_1.RobotMap.toDTO(Robot);
            return Result_1.Result.ok({ robotDTO: RobotDTOResult });
        }
        catch (e) {
            throw e;
        }
    }
    async getAllRobots() {
        try {
            const Robots = await this.robotRepo.getAll();
            if (Robots === null) {
                return Result_1.Result.fail("Robots not found");
            }
            else {
                const RobotsDTOResult = Robots.map(Robot => RobotMap_1.RobotMap.toDTO(Robot));
                return Result_1.Result.ok({ robotDTO: RobotsDTOResult });
            }
        }
        catch (e) {
            throw e;
        }
    }
    async getRobotsByTask(task) {
        try {
            const Robots = await this.robotRepo.getRobotsByTask(task);
            const found = !!Robots;
            if (!found) {
                return Result_1.Result.fail("Robots with task=" + task + " not found");
            }
            else {
                const RobotsDTOResult = Robots.map(Robot => RobotMap_1.RobotMap.toDTO(Robot));
                return Result_1.Result.ok({ robotDTO: RobotsDTOResult });
            }
        }
        catch (e) {
            throw e;
        }
    }
};
RobotService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.robot.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.repos.typerobot.name)),
    __param(2, (0, typedi_1.Inject)('logger')),
    __metadata("design:paramtypes", [Object, Object, Object])
], RobotService);
exports.default = RobotService;
//# sourceMappingURL=robotService.js.map