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
let HallwayController = class HallwayController {
    constructor(hallwayServiceInstance) {
        this.hallwayServiceInstance = hallwayServiceInstance;
    }
    async createHallway(req, res, next) {
        try {
            const hallwayOrError = await this.hallwayServiceInstance.CreateHallway(req.body);
            if (hallwayOrError.isFailure) {
                return res.status(402).send();
            }
            const hallwayDTO = hallwayOrError.getValue();
            return res.json(hallwayDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
    async updateHallway(req, res, next) {
        try {
            const hallwayOrError = await this.hallwayServiceInstance.updateHallway(req.body);
            if (hallwayOrError.isFailure) {
                return res.status(402).send(hallwayOrError.errorValue());
            }
            const hallwayDTO = hallwayOrError.getValue();
            return res.status(201).json(hallwayDTO);
        }
        catch (e) {
            return next(e);
        }
    }
    async getBetweenBuildings(req, res, next) {
        try {
            console.log(req.body.building1);
            const hallwayOrError = await this.hallwayServiceInstance.getBetweenBuildings(req.body.building1, req.body.building2);
            if (hallwayOrError.isFailure) {
                return res.status(402).send(hallwayOrError.errorValue());
            }
            const hallwayDTO = hallwayOrError.getValue();
            return res.status(201).json(hallwayDTO);
        }
        catch (e) {
            return next(e);
        }
    }
};
HallwayController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.hallway.name)),
    __metadata("design:paramtypes", [Object])
], HallwayController);
exports.default = HallwayController;
//# sourceMappingURL=hallwayController.js.map