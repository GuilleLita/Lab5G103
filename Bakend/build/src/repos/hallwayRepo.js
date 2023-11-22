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
const hallwayId_1 = require("../domain/hallwayId");
const HallwayMap_1 = require("../mappers/HallwayMap");
let HallwayRepo = class HallwayRepo {
    constructor(HallwaySchema, logger) {
        this.HallwaySchema = HallwaySchema;
        this.logger = logger;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(hallwayId) {
        const idX = hallwayId instanceof hallwayId_1.HallwayId ? hallwayId.id.toValue() : hallwayId_1.HallwayId;
        const query = { domainId: idX };
        const HallwayDocument = await this.HallwaySchema.findOne(query);
        return !!HallwayDocument === true;
    }
    async save(hallway) {
        const query = { hallwayId: hallway.id.toString() };
        const HallwayDocument = await this.HallwaySchema.findOne(query);
        try {
            if (HallwayDocument === null) {
                const rawHallway = HallwayMap_1.HallwayMap.toPersistence(hallway);
                const HallwayCreated = await this.HallwaySchema.create(rawHallway);
                return HallwayMap_1.HallwayMap.toDomain(HallwayCreated);
            }
            else {
                HallwayDocument.buildingsCode = hallway.buildingsCode;
                HallwayDocument.floorsId = hallway.floorsId;
                HallwayDocument.position = hallway.position;
                await HallwayDocument.save();
                return hallway;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findById(_hallwayId) {
        const idX = _hallwayId instanceof hallwayId_1.HallwayId ? _hallwayId.id.toValue() : _hallwayId;
        const query = { hallwayId: idX };
        const HallwayRecord = await this.HallwaySchema.findOne(query);
        if (HallwayRecord != null) {
            return HallwayMap_1.HallwayMap.toDomain(HallwayRecord);
        }
        else
            return null;
    }
    async existsWithFloor(floorId) {
        const query = { floorsId: floorId };
        const HallwayRecord = await this.HallwaySchema.findOne(query);
        if (HallwayRecord != null) {
            return true;
        }
        else
            return false;
    }
    async findByBuildings(code1, code2) {
        const query = { buildingsCode: { $in: [code1, code2] } };
        const HallwayRecord = await this.HallwaySchema.find(query);
        const Hallways = [];
        if (HallwayRecord != null) {
            for (let i = 0; i < HallwayRecord.length; i++) {
                Hallways.push(await HallwayMap_1.HallwayMap.toDomain(HallwayRecord[i]));
            }
            return Hallways;
        }
        else
            return null;
    }
};
HallwayRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('hallwaySchema')),
    __param(1, (0, typedi_1.Inject)('logger')),
    __metadata("design:paramtypes", [mongoose_1.Model, Object])
], HallwayRepo);
exports.default = HallwayRepo;
//# sourceMappingURL=hallwayRepo.js.map