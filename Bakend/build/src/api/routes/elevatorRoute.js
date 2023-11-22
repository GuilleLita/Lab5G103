"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = require("typedi");
const elevatorService_1 = __importDefault(require("../../services/elevatorService"));
const celebrate_1 = require("celebrate");
const config_1 = __importDefault(require("../../../config"));
var elevator_controller = require('../../controllers/elevatorController');
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/elevator', route);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.elevator.name);
    route.post('/create', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            //elevatorId: Joi.string().required(),
            buildingId: celebrate_1.Joi.string().required(),
            floorId: celebrate_1.Joi.string().required(),
            position: celebrate_1.Joi.array().required()
        }),
    }), async (req, res, next) => {
        const logger = typedi_1.Container.get('logger');
        try {
            const authServiceInstance = typedi_1.Container.get(elevatorService_1.default);
            const elevatorOrError = await authServiceInstance.CreateElevator(req.body);
            if (elevatorOrError.isFailure) {
                logger.debug(elevatorOrError.errorValue());
                return res.status(401).send(elevatorOrError.errorValue());
            }
            const elevatorDTO = elevatorOrError.getValue();
            return res.status(201).json({ message: "success", elevatorDTO });
        }
        catch (e) {
            //logger.error('🔥 error: %o', e);
            return next(e);
        }
    });
    route.put('/update', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            elevatorId: celebrate_1.Joi.string().required(),
            buildingId: celebrate_1.Joi.string().required(),
            floorId: celebrate_1.Joi.string().required(),
            position: celebrate_1.Joi.array().required()
        }),
    }), (req, res, next) => ctrl.updateElevator(req, res, next));
    route.get("/getbybuilding", (req, res, next) => ctrl.getElevatorsByBuilding(req, res, next));
};
//# sourceMappingURL=elevatorRoute.js.map