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
const FloorMap_1 = require("../mappers/FloorMap");
const floor_1 = require("../domain/floor");
const Result_1 = require("../core/logic/Result");
let FloorService = class FloorService {
    constructor(floorRepo, hallwayRepo, elevatorRepo, logger) {
        this.floorRepo = floorRepo;
        this.hallwayRepo = hallwayRepo;
        this.elevatorRepo = elevatorRepo;
        this.logger = logger;
    }
    async CreateFloor(floorDTO) {
        try {
            const floorDocument = await this.floorRepo.findByName(floorDTO.floorName);
            const found = !!floorDocument;
            if (found) {
                return Result_1.Result.fail("floor already exists with name=" + floorDTO.floorName);
            }
            const FloorOrError = await floor_1.Floor.create({
                floorName: floorDTO.floorName,
                description: floorDTO.description,
                buildingCode: floorDTO.buildingCode,
                height: floorDTO.height,
                width: floorDTO.width,
                rooms: floorDTO.rooms,
                grid: floorDTO.grid
            });
            if (FloorOrError.isFailure) {
                throw Result_1.Result.fail(FloorOrError.errorValue());
            }
            const FloorResult = FloorOrError.getValue();
            await this.floorRepo.save(FloorResult);
            const FloorDTOResult = FloorMap_1.FloorMap.toDTO(FloorResult);
            return Result_1.Result.ok({ floorDTO: FloorDTOResult });
        }
        catch (e) {
            throw e;
        }
    }
    async updateFloor(floorDTO) {
        try {
            const Floor = await this.floorRepo.findByName(floorDTO.floorName);
            const found = !!Floor === true;
            if (!found) {
                return Result_1.Result.fail("floor not found with name=" + floorDTO.floorName);
            }
            Floor.name = floorDTO.floorName;
            Floor.description = floorDTO.description;
            Floor.buildingCode = floorDTO.buildingCode;
            Floor.height = floorDTO.height;
            Floor.width = floorDTO.width;
            Floor.rooms = floorDTO.rooms;
            Floor.grid = floorDTO.grid;
            await this.floorRepo.save(Floor);
            const FloorDTOResult = FloorMap_1.FloorMap.toDTO(Floor);
            return Result_1.Result.ok({ floorDTO: FloorDTOResult });
        }
        catch (e) {
            throw e;
        }
    }
    async getFloorsByBuilding(buildingCode) {
        try {
            const Floors = await this.floorRepo.findByBuildingCode(buildingCode);
            const found = !!Floors === true;
            if (!found) {
                return Result_1.Result.fail("floor not found with buildingCode=" + buildingCode);
            }
            const FloorDTOResult = Floors.map(Floor => FloorMap_1.FloorMap.toDTO(Floor));
            return Result_1.Result.ok({ floorDTO: FloorDTOResult });
        }
        catch (e) {
            throw e;
        }
    }
    async getFloorsWithHallwaysByBuilding(code) {
        try {
            const Floors = await this.floorRepo.findByBuildingCode(code);
            const found = !!Floors === true;
            if (!found) {
                return Result_1.Result.fail("floor not found with buildingCode=" + code);
            }
            const FloorDTOResult = Floors.map(Floor => FloorMap_1.FloorMap.toDTO(Floor));
            const FloorsWithHallways = [];
            for (let i = 0; i < FloorDTOResult.length; i++) {
                const Hallways = await this.hallwayRepo.existsWithFloor(FloorDTOResult[i].floorName);
                if (Hallways) {
                    FloorsWithHallways.push(FloorDTOResult[i]);
                }
            }
            return Result_1.Result.ok({ floorDTO: FloorsWithHallways });
        }
        catch (e) {
            throw e;
        }
    }
    async getFloorsWithElevatorByBuilding(code) {
        try {
            const Floors = await this.floorRepo.findByBuildingCode(code);
            const found = !!Floors === true;
            if (!found) {
                return Result_1.Result.fail("floor not found with buildingCode=" + code);
            }
            const FloorDTOResult = Floors.map(Floor => FloorMap_1.FloorMap.toDTO(Floor));
            const FloorsWithElevator = [];
            for (let i = 0; i < FloorDTOResult.length; i++) {
                const Elevator = await this.elevatorRepo.existsInFloor(FloorDTOResult[i].floorName);
                if (Elevator) {
                    FloorsWithElevator.push(FloorDTOResult[i]);
                }
            }
            return Result_1.Result.ok({ floorDTO: FloorsWithElevator });
        }
        catch (e) {
            throw e;
        }
    }
    async uploadFloorMap(floor, grid) {
        try {
            const Floor = await this.floorRepo.findByName(floor);
            const found = !!Floor === true;
            if (!found) {
                return Result_1.Result.fail("floor not found with name=" + floor);
            }
            if (grid.length != Floor.height || grid[0].length != Floor.width) {
                return Result_1.Result.fail("grid size is not correct");
            }
            console.log(grid);
            Floor.grid = grid;
            await this.floorRepo.save(Floor);
            const FloorDTOResult = FloorMap_1.FloorMap.toDTO(Floor);
            return Result_1.Result.ok({ floorDTO: FloorDTOResult });
        }
        catch (e) {
            throw e;
        }
    }
    async getFloor(floorName) {
        try {
            const Floor = await this.floorRepo.findByName(floorName);
            const found = !!Floor === true;
            if (!found) {
                return Result_1.Result.fail("floor not found with name=" + floorName);
            }
            const FloorDTOResult = FloorMap_1.FloorMap.toDTO(Floor);
            return Result_1.Result.ok({ floorDTO: FloorDTOResult });
        }
        catch (e) {
            throw e;
        }
    }
};
FloorService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.floor.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.repos.hallway.name)),
    __param(2, (0, typedi_1.Inject)(config_1.default.repos.elevator.name)),
    __param(3, (0, typedi_1.Inject)('logger')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], FloorService);
exports.default = FloorService;
//# sourceMappingURL=floorService.js.map