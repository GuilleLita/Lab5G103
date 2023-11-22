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
const floorId_1 = require("../domain/floorId");
const FloorMap_1 = require("../mappers/FloorMap");
let FloorRepo = class FloorRepo {
    constructor(floorSchema, logger) {
        this.floorSchema = floorSchema;
        this.logger = logger;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(floorId) {
        const idX = floorId instanceof floorId_1.FloorId ? floorId.id.toValue() : floorId_1.FloorId;
        const query = { floorId: idX };
        const FloorDocument = await this.floorSchema.findOne(query);
        return !!FloorDocument === true;
    }
    async save(floor) {
        const query = { floorId: floor.id.toString() };
        const FloorDocument = await this.floorSchema.findOne(query);
        try {
            if (FloorDocument === null) {
                const rawFloor = FloorMap_1.FloorMap.toPersistence(floor);
                const FloorCreated = await this.floorSchema.create(rawFloor);
                return FloorMap_1.FloorMap.toDomain(FloorCreated);
            }
            else {
                FloorDocument.floorName = floor.name;
                FloorDocument.description = floor.description;
                FloorDocument.buildingCode = floor.buildingCode;
                FloorDocument.height = floor.height;
                FloorDocument.width = floor.width;
                FloorDocument.rooms = floor.rooms;
                FloorDocument.grid = floor.grid;
                await FloorDocument.save();
                return floor;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findById(floorId) {
        const idX = floorId instanceof floorId_1.FloorId ? floorId.id.toValue() : floorId_1.FloorId;
        const query = { floorId: idX };
        const FloorRecord = await this.floorSchema.findOne(query);
        if (FloorRecord != null) {
            return FloorMap_1.FloorMap.toDomain(FloorRecord);
        }
        else
            return null;
    }
    async findByName(floorName) {
        const query = { floorName: floorName };
        const floorRecord = await this.floorSchema.findOne(query);
        if (floorRecord != null) {
            return FloorMap_1.FloorMap.toDomain(floorRecord);
        }
        else
            return null;
    }
    async findByBuildingCode(buildingCode) {
        const query = { buildingCode: buildingCode };
        const floorRecord = await this.floorSchema.find(query);
        const floorArray = [];
        if (floorRecord.length > 0) {
            for (let i = 0; i < floorRecord.length; i++) {
                floorArray.push(await FloorMap_1.FloorMap.toDomain(floorRecord[i]));
            }
            return floorArray;
        }
        else
            return null;
    }
};
FloorRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('floorSchema')),
    __param(1, (0, typedi_1.Inject)('logger')),
    __metadata("design:paramtypes", [mongoose_1.Model, Object])
], FloorRepo);
exports.default = FloorRepo;
//# sourceMappingURL=floorRepo.js.map