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
const elevatorId_1 = require("../domain/elevatorId");
const ElevatorMap_1 = require("../mappers/ElevatorMap");
let ElevatorRepo = class ElevatorRepo {
    constructor(elevatorSchema, floorSchema, logger) {
        this.elevatorSchema = elevatorSchema;
        this.floorSchema = floorSchema;
        this.logger = logger;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(elevatorId) {
        const idX = elevatorId instanceof elevatorId_1.ElevatorId ? elevatorId.id.toValue() : elevatorId;
        const query = { elevatorId: idX };
        const ElevatorDocument = await this.elevatorSchema.findOne(query);
        return !!ElevatorDocument === true;
    }
    async save(elevator) {
        const query = { elevatorId: elevator.id.toString() };
        const ElevatorDocument = await this.elevatorSchema.findOne(query);
        try {
            if (ElevatorDocument === null) {
                const rawElevator = ElevatorMap_1.ElevatorMap.toPersistence(elevator);
                const ElevatorCreated = await this.elevatorSchema.create(rawElevator);
                return ElevatorMap_1.ElevatorMap.toDomain(ElevatorCreated);
            }
            else {
                ElevatorDocument.buildingId = elevator.buildingId;
                ElevatorDocument.floorId = elevator.floorId;
                ElevatorDocument.position = elevator.position;
                await ElevatorDocument.save();
                return elevator;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findById(elevatorId) {
        const idX = elevatorId instanceof elevatorId_1.ElevatorId ? elevatorId.id.toValue() : elevatorId;
        const query = { elevatorId: idX };
        const ElevatorRecord = await this.elevatorSchema.findOne(query);
        if (ElevatorRecord != null) {
            return ElevatorMap_1.ElevatorMap.toDomain(ElevatorRecord);
        }
        else
            return null;
    }
    async findByBuildingCode(buildingCode) {
        const query = { buildingId: buildingCode };
        const ElevatorRecord = await this.elevatorSchema.find(query);
        const Elevators = [];
        console.log(ElevatorRecord);
        if (ElevatorRecord.length > 0) {
            for (var i = 0; i < ElevatorRecord.length; i++) {
                Elevators.push(await ElevatorMap_1.ElevatorMap.toDomain(ElevatorRecord[i]));
            }
            return Elevators;
        }
        else
            return null;
    }
    async existsInFloor(name) {
        const query = { floorId: name };
        console.log(query);
        const floorRecord = await this.elevatorSchema.findOne(query);
        if (floorRecord != null) {
            return true;
        }
        else
            return false;
    }
};
ElevatorRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('elevatorSchema')),
    __param(1, (0, typedi_1.Inject)('floorSchema')),
    __param(2, (0, typedi_1.Inject)('logger')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model, Object])
], ElevatorRepo);
exports.default = ElevatorRepo;
//# sourceMappingURL=elevatorRepo.js.map