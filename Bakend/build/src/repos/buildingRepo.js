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
const building_1 = require("../domain/building");
const BuildingMap_1 = require("../mappers/BuildingMap");
let BuildingRepo = class BuildingRepo {
    constructor(buildingSchema, logger) {
        this.buildingSchema = buildingSchema;
        this.logger = logger;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(buildingCode) {
        const idX = buildingCode instanceof building_1.Building ? buildingCode.buildingCode : buildingCode;
        const query = { buildingCode: idX };
        const BuildingDocument = await this.buildingSchema.findOne(query);
        return !!BuildingDocument === true;
    }
    async save(building) {
        const query = { buildingCode: building.buildingCode };
        const BuildingDocument = await this.buildingSchema.findOne(query);
        try {
            if (BuildingDocument === null) {
                const rawBuilding = BuildingMap_1.BuildingMap.toPersistence(building);
                const BuildingCreated = await this.buildingSchema.create(rawBuilding);
                return BuildingMap_1.BuildingMap.toDomain(BuildingCreated);
            }
            else {
                BuildingDocument.buildingName = building.name;
                BuildingDocument.description = building.description;
                BuildingDocument.height = building.height;
                BuildingDocument.width = building.width;
                BuildingDocument.numOfFloors = building.numOfFloors;
                BuildingDocument.floors = building.floors;
                BuildingDocument.elevatorFloors = building.elevatorFloors;
                await BuildingDocument.save();
                return building;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByName(name) {
        const query = { buildingName: name.toString() };
        const buildingRecord = await this.buildingSchema.findOne(query);
        if (buildingRecord != null) {
            return BuildingMap_1.BuildingMap.toDomain(buildingRecord);
        }
        else
            return null;
    }
    async findByCode(buildingCode) {
        const idX = buildingCode;
        const query = { buildingCode: idX };
        const BuildingRecord = await this.buildingSchema.findOne(query);
        if (BuildingRecord != null) {
            return BuildingMap_1.BuildingMap.toDomain(BuildingRecord);
        }
        else {
            return null;
        }
    }
    async getAll() {
        const BuildingRecord = await this.buildingSchema.find();
        const BuildingArray = [];
        if (BuildingRecord != null) {
            for (var i = 0; i < BuildingRecord.length; i++) {
                BuildingArray.push(await BuildingMap_1.BuildingMap.toDomain(BuildingRecord[i]));
            }
            return BuildingArray;
        }
        else
            return null;
    }
    async getBuildingsByMinMax(min, max) {
        const query = { numOfFloors: { $gte: min, $lte: max } };
        const BuildingRecord = await this.buildingSchema.find(query);
        const BuildingArray = [];
        if (BuildingRecord.length > 0) {
            for (var i = 0; i < BuildingRecord.length; i++) {
                BuildingArray.push(await BuildingMap_1.BuildingMap.toDomain(BuildingRecord[i]));
            }
            return BuildingArray;
        }
        else
            return null;
    }
};
BuildingRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('buildingSchema')),
    __param(1, (0, typedi_1.Inject)('logger')),
    __metadata("design:paramtypes", [mongoose_1.Model, Object])
], BuildingRepo);
exports.default = BuildingRepo;
//# sourceMappingURL=buildingRepo.js.map