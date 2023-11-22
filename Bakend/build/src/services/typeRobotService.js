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
const typerobot_1 = require("../domain/typerobot");
const Result_1 = require("../core/logic/Result");
const TypeRobotMap_1 = require("../mappers/TypeRobotMap");
let TypeRobotService = class TypeRobotService {
    constructor(typerobotRepo) {
        this.typerobotRepo = typerobotRepo;
    }
    async createTypeRobot(typerobotDTO) {
        try {
            const typerobotOrError = await typerobot_1.TypeRobot.create(typerobotDTO);
            if (typerobotOrError.isFailure) {
                return Result_1.Result.fail(typerobotOrError.errorValue());
            }
            const typerobotResult = typerobotOrError.getValue();
            await this.typerobotRepo.save(typerobotResult);
            const typerobotDTOResult = TypeRobotMap_1.TypeRobotMap.toDTO(typerobotResult);
            return Result_1.Result.ok(typerobotDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async updateTypeRobot(typerobotDTO) {
        try {
            const typerobot = await this.typerobotRepo.findByrobotType(typerobotDTO.robotType);
            if (typerobot === null) {
                return Result_1.Result.fail("TypeRobot not found");
            }
            else {
                typerobot.robotType = typerobotDTO.robotType;
                await this.typerobotRepo.save(typerobot);
                const typerobotDTOResult = TypeRobotMap_1.TypeRobotMap.toDTO(typerobot);
                return Result_1.Result.ok(typerobotDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
};
TypeRobotService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.typerobot.name)),
    __metadata("design:paramtypes", [Object])
], TypeRobotService);
exports.default = TypeRobotService;
//# sourceMappingURL=typeRobotService.js.map