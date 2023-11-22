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
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const mongoose_1 = require("mongoose");
const robotId_1 = require("../domain/robotId");
const RobotMap_1 = require("../mappers/RobotMap");
let RobotRepo = class RobotRepo {
    constructor(robotSchema, typerobotSchema, logger) {
        this.robotSchema = robotSchema;
        this.typerobotSchema = typerobotSchema;
        this.logger = logger;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(robotId) {
        const idX = robotId instanceof robotId_1.RobotId ? robotId.id.toValue() : robotId_1.RobotId;
        const query = { domainId: idX };
        const RobotDocument = await this.robotSchema.findOne(query);
        return !!RobotDocument === true;
    }
    async save(robot) {
        const query = { robotId: robot.id.toString() };
        const RobotDocument = await this.robotSchema.findOne(query);
        try {
            if (RobotDocument === null) {
                const rawRobot = RobotMap_1.RobotMap.toPersistence(robot);
                const RobotCreated = await this.robotSchema.create(rawRobot);
                return RobotMap_1.RobotMap.toDomain(RobotCreated);
            }
            else {
                if (RobotDocument.status === 'inhibit') {
                    throw new Error('Cannot update robot task with status "inhibit", you have to desinhibit.');
                }
                RobotDocument.currentlytask = robot.currentlytask;
                RobotDocument.currentlyPosition = robot.currentlyPosition;
                RobotDocument.destinationPosition = robot.destinationPosition;
                RobotDocument.status = robot.status;
                await RobotDocument.save();
                return robot;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async savedesInhibit(robot) {
        const query = { robotId: robot.id.toString() };
        const robotDocument = await this.robotSchema.findOne(query);
        try {
            if (robotDocument === null) {
                const rawRobot = RobotMap_1.RobotMap.toPersistence(robot);
                const robotCreated = await this.robotSchema.create(rawRobot);
                return RobotMap_1.RobotMap.toDomain(robotCreated);
            }
            else {
                // Actualizar solo el campo 'status'
                if (robot.status) {
                    robotDocument.status = robot.status;
                }
                await robotDocument.save();
                return robot;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async saveInhibit(robot) {
        const query = { robotId: robot.id.toString() };
        const robotDocument = await this.robotSchema.findOne(query);
        try {
            if (robotDocument === null) {
                const rawRobot = RobotMap_1.RobotMap.toPersistence(robot);
                const robotCreated = await this.robotSchema.create(rawRobot);
                return RobotMap_1.RobotMap.toDomain(robotCreated);
            }
            else {
                // Actualizar solo el campo 'status'
                if (robot.status) {
                    robotDocument.status = robot.status;
                }
                await robotDocument.save();
                return robot;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByDomainId(robotId) {
        const idX = robotId instanceof robotId_1.RobotId ? robotId.id.toValue() : robotId;
        const query = { robotId: idX };
        const RobotRecord = await this.robotSchema.findOne(query);
        if (RobotRecord != null) {
            return RobotMap_1.RobotMap.toDomain(RobotRecord);
        }
        else
            return null;
    }
    async getAll() {
        const RobotRecord = await this.robotSchema.find();
        const RobotArray = [];
        if (RobotRecord != null) {
            for (var i = 0; i < RobotRecord.length; i++) {
                RobotArray.push(await RobotMap_1.RobotMap.toDomain(RobotRecord[i]));
            }
            return RobotArray;
        }
        else
            return null;
    }
    async getRobotsByTask(task) {
        const query = { taskspermited: { $in: [task] } };
        const RobotRecord = await this.typerobotSchema.find(query);
        const query2 = { robotType: { $in: [RobotRecord[0].robotType] } };
        const RobotRecord2 = await this.robotSchema.find(query2);
        const RobotArray = [];
        if (RobotRecord2.length > 0) {
            for (var i = 0; i < RobotRecord.length; i++) {
                RobotArray.push(await RobotMap_1.RobotMap.toDomain(RobotRecord2[i]));
            }
            return RobotArray;
        }
        else
            return null;
    }
};
RobotRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('robotSchema')),
    __param(1, (0, typedi_1.Inject)('typerobotSchema')),
    __param(2, (0, typedi_1.Inject)('logger')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model, Object])
], RobotRepo);
exports.default = RobotRepo;
//# sourceMappingURL=robotRepo.js.map