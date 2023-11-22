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
const HallwayMap_1 = require("../mappers/HallwayMap");
const hallway_1 = require("../domain/hallway");
const Result_1 = require("../core/logic/Result");
let HallwayService = class HallwayService {
    constructor(hallwayRepo, buildingRepo, floorRepo, logger) {
        this.hallwayRepo = hallwayRepo;
        this.buildingRepo = buildingRepo;
        this.floorRepo = floorRepo;
        this.logger = logger;
    }
    async comprobarHallway(hallwayDTO) {
        if (hallwayDTO.buildingsCode.length != 2) {
            return "Hallway must have 2 buildings";
        }
        if (hallwayDTO.floorsId.length != 2) {
            return "Hallway must have 2 floors";
        }
        for (let i = 0; i < hallwayDTO.buildingsCode.length; i++) {
            let building = await this.buildingRepo.findByCode(hallwayDTO.buildingsCode[i]);
            if (building == null) {
                return "Building with code " + hallwayDTO.buildingsCode[i] + " not found";
            }
        }
        return "ok";
    }
    async CreateHallway(hallwayDTO) {
        try {
            let comprobar = await this.comprobarHallway(hallwayDTO);
            if (comprobar != "ok") {
                return Result_1.Result.fail(comprobar);
            }
            const hallwayOrError = await hallway_1.Hallway.create({
                //hallwayId: hallwayDTO.hallwayId,
                buildingsCode: hallwayDTO.buildingsCode,
                floorsId: hallwayDTO.floorsId,
                position: hallwayDTO.position
            });
            if (hallwayOrError.isFailure) {
                throw Result_1.Result.fail(hallwayOrError.errorValue());
            }
            const hallwayResult = hallwayOrError.getValue();
            await this.hallwayRepo.save(hallwayResult);
            const hallwayDTOResult = HallwayMap_1.HallwayMap.toDTO(hallwayResult);
            return Result_1.Result.ok({ hallwayDTO: hallwayDTOResult });
        }
        catch (e) {
            throw e;
        }
    }
    async updateHallway(hallwayDTO) {
        try {
            const hallway = await this.hallwayRepo.findById(hallwayDTO.hallwayId);
            const found = !!hallway === true;
            if (!found) {
                return Result_1.Result.fail("Hallway not found with id=" + hallwayDTO.hallwayId);
            }
            let comprobar = await this.comprobarHallway(hallwayDTO);
            if (!comprobar) {
                return Result_1.Result.fail("Hallway is not valid");
            }
            hallway.buildingsCode = hallwayDTO.buildingsCode;
            hallway.floorsId = hallwayDTO.floorsId;
            hallway.position = hallwayDTO.position;
            await this.hallwayRepo.save(hallway);
            const hallwayDTOResult = HallwayMap_1.HallwayMap.toDTO(hallway);
            return Result_1.Result.ok({ hallwayDTO: hallwayDTOResult });
        }
        catch (e) {
            throw e;
        }
    }
    async getBetweenBuildings(building1, building2) {
        try {
            const hallways = await this.hallwayRepo.findByBuildings(building1, building2);
            const found = !!hallways === true;
            if (!found) {
                return Result_1.Result.fail("Hallway not found with buildingCode=" + building1 + " and " + building2);
            }
            const hallwayDTOResult = hallways.map(hallway => HallwayMap_1.HallwayMap.toDTO(hallway));
            return Result_1.Result.ok({ hallwayDTO: hallwayDTOResult });
        }
        catch (e) {
            throw e;
        }
    }
};
HallwayService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.hallway.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.repos.building.name)),
    __param(2, (0, typedi_1.Inject)(config_1.default.repos.floor.name)),
    __param(3, (0, typedi_1.Inject)('logger')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], HallwayService);
exports.default = HallwayService;
//# sourceMappingURL=hallwayService.js.map