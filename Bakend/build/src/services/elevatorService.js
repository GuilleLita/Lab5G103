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
const ElevatorMap_1 = require("../mappers/ElevatorMap");
const elevator_1 = require("../domain/elevator");
const Result_1 = require("../core/logic/Result");
let ElevatorService = class ElevatorService {
    constructor(elevatorRepo, logger) {
        this.elevatorRepo = elevatorRepo;
        this.logger = logger;
    }
    async CreateElevator(elevatorDTO) {
        try {
            const elevatorDocument = await this.elevatorRepo.findById(elevatorDTO.elevatorId);
            const found = !!elevatorDocument;
            if (found) {
                return Result_1.Result.fail("Elevator already exists with id=" + elevatorDTO.elevatorId);
            }
            const ElevatorOrError = await elevator_1.Elevator.create({
                //elevatorId: elevatorDTO.elevatorId,
                buildingId: elevatorDTO.buildingId,
                floorId: elevatorDTO.floorId,
                position: elevatorDTO.position
            });
            if (ElevatorOrError.isFailure) {
                throw Result_1.Result.fail(ElevatorOrError.errorValue());
            }
            const ElevatorResult = ElevatorOrError.getValue();
            await this.elevatorRepo.save(ElevatorResult);
            const ElevatorDTOResult = ElevatorMap_1.ElevatorMap.toDTO(ElevatorResult);
            return Result_1.Result.ok({ elevatorDTO: ElevatorDTOResult });
        }
        catch (e) {
            throw e;
        }
    }
    async updateElevator(elevatorDTO) {
        try {
            const Elevator = await this.elevatorRepo.findById(elevatorDTO.elevatorId);
            const found = !!Elevator === true;
            if (!found) {
                return Result_1.Result.fail("elevator not found with id=" + elevatorDTO.elevatorId);
            }
            Elevator.buildingId = elevatorDTO.buildingId;
            Elevator.floorId = elevatorDTO.floorId;
            Elevator.position = elevatorDTO.position;
            await this.elevatorRepo.save(Elevator);
            const ElevatorDTOResult = ElevatorMap_1.ElevatorMap.toDTO(Elevator);
            return Result_1.Result.ok({ elevatorDTO: ElevatorDTOResult });
        }
        catch (e) {
            throw e;
        }
    }
    async getElevatorsByBuilding(buildingCode) {
        try {
            const Elevators = await this.elevatorRepo.findByBuildingCode(buildingCode);
            const found = !!Elevators;
            if (!found) {
                return Result_1.Result.fail("elevator not found with buildingCode=" + buildingCode);
            }
            const ElevatorDTOResult = Elevators.map(Elevator => ElevatorMap_1.ElevatorMap.toDTO(Elevator));
            return Result_1.Result.ok({ elevatorDTO: ElevatorDTOResult });
        }
        catch (e) {
            throw e;
        }
    }
};
ElevatorService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.elevator.name)),
    __param(1, (0, typedi_1.Inject)('logger')),
    __metadata("design:paramtypes", [Object, Object])
], ElevatorService);
exports.default = ElevatorService;
//# sourceMappingURL=elevatorService.js.map