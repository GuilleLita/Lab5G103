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
const BuildingMap_1 = require("../mappers/BuildingMap");
const building_1 = require("../domain/building");
const Result_1 = require("../core/logic/Result");
let BuildingService = class BuildingService {
    constructor(buildingRepo, 
    //@Inject(config.repos.Building.name) private BuildingRepo : IBuildingRepo,
    logger) {
        this.buildingRepo = buildingRepo;
        this.logger = logger;
    }
    async CreateBuilding(buildingDTO) {
        try {
            const buildingDocument = await this.buildingRepo.findByCode(buildingDTO.buildingCode);
            const found = !!buildingDocument;
            if (found) {
                return Result_1.Result.fail("building already exists with code=" + buildingDTO.buildingCode);
            }
            const buildingOrError = await building_1.Building.create({
                buildingCode: buildingDTO.buildingCode,
                buildingName: buildingDTO.buildingName,
                description: buildingDTO.description,
                height: buildingDTO.height,
                width: buildingDTO.width,
                numOfFloors: buildingDTO.numOfFloors,
                floors: buildingDTO.floors,
                elevatorFloors: buildingDTO.elevatorFloors
            });
            if (buildingOrError.isFailure) {
                throw Result_1.Result.fail(buildingOrError.errorValue());
            }
            const buildingResult = buildingOrError.getValue();
            await this.buildingRepo.save(buildingResult);
            const buildingDTOResult = BuildingMap_1.BuildingMap.toDTO(buildingResult);
            return Result_1.Result.ok({ buildingDTO: buildingDTOResult });
        }
        catch (e) {
            throw e;
        }
    }
    async updateBuilding(buildingDTO) {
        try {
            const Building = await this.buildingRepo.findByCode(buildingDTO.buildingCode);
            if (Building === null) {
                return Result_1.Result.fail("Building not found");
            }
            else {
                Building.name = buildingDTO.buildingName;
                Building.description = buildingDTO.description;
                Building.height = buildingDTO.height;
                Building.width = buildingDTO.width;
                Building.numOfFloors = buildingDTO.numOfFloors;
                Building.floors = buildingDTO.floors;
                Building.elevatorFloors = buildingDTO.elevatorFloors;
                await this.buildingRepo.save(Building);
                const BuildingDTOResult = BuildingMap_1.BuildingMap.toDTO(Building);
                return Result_1.Result.ok({ buildingDTO: BuildingDTOResult });
            }
        }
        catch (e) {
            throw e;
        }
    }
    async getAllBuildings() {
        try {
            const Buildings = await this.buildingRepo.getAll();
            if (Buildings === null) {
                return Result_1.Result.fail("Building not found");
            }
            else {
                const BuildingsDTOResult = Buildings.map(Building => BuildingMap_1.BuildingMap.toDTO(Building));
                return Result_1.Result.ok({ buildingDTO: BuildingsDTOResult });
            }
        }
        catch (e) {
            throw e;
        }
    }
    async getBuildingsByMinMax(min, max) {
        try {
            const Buildings = await this.buildingRepo.getBuildingsByMinMax(min, max);
            const found = !!Buildings;
            if (!found) {
                return Result_1.Result.fail("Buildings with numOfFloor between minFloors=" + min + " and maxFloors=" + max + " not found");
            }
            else {
                const BuildingsDTOResult = Buildings.map(Building => BuildingMap_1.BuildingMap.toDTO(Building));
                return Result_1.Result.ok({ buildingDTO: BuildingsDTOResult });
            }
        }
        catch (e) {
            throw e;
        }
    }
};
BuildingService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.building.name)),
    __param(1, (0, typedi_1.Inject)('logger')),
    __metadata("design:paramtypes", [Object, Object])
], BuildingService);
exports.default = BuildingService;
//# sourceMappingURL=buildingService.js.map