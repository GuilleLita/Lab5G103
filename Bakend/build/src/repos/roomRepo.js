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
const roomId_1 = require("../domain/roomId");
const RoomMap_1 = require("../mappers/RoomMap");
let RoomRepo = class RoomRepo {
    constructor(RoomSchema, logger) {
        this.RoomSchema = RoomSchema;
        this.logger = logger;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(roomId) {
        const idX = roomId instanceof roomId_1.RoomId ? roomId.id.toValue() : roomId_1.RoomId;
        const query = { domainId: idX };
        const RoomDocument = await this.RoomSchema.findOne(query);
        return !!RoomDocument === true;
    }
    async save(room) {
        const query = { roomId: room.id.toString() };
        const RoomDocument = await this.RoomSchema.findOne(query);
        try {
            if (RoomDocument === null) {
                const rawRoom = RoomMap_1.RoomMap.toPersistence(room);
                const RoomCreated = await this.RoomSchema.create(rawRoom);
                return RoomMap_1.RoomMap.toDomain(RoomCreated);
            } /*else {
              BuildingDocument.firstName = building.firstName;
              BuildingDocument.lastName = building.lastName;
              await BuildingDocument.save();
      
              return building;
            }*/
        }
        catch (err) {
            throw err;
        }
    }
    async findById(roomId) {
        const idX = roomId instanceof roomId_1.RoomId ? roomId.id.toValue() : roomId;
        const query = { roomId: idX };
        const RoomRecord = await this.RoomSchema.findOne(query);
        if (RoomRecord != null) {
            return RoomMap_1.RoomMap.toDomain(RoomRecord);
        }
        else
            return null;
    }
};
RoomRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('roomSchema')),
    __param(1, (0, typedi_1.Inject)('logger')),
    __metadata("design:paramtypes", [mongoose_1.Model, Object])
], RoomRepo);
exports.default = RoomRepo;
//# sourceMappingURL=roomRepo.js.map