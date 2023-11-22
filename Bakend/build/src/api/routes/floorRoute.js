"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = require("typedi");
const floorService_1 = __importDefault(require("../../services/floorService"));
const celebrate_1 = require("celebrate");
const config_1 = __importDefault(require("../../../config"));
var floor_controller = require('../../controllers/floorController');
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/floor', route);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.floor.name);
    route.post('/create', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            floorName: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required(),
            buildingCode: celebrate_1.Joi.string().required(),
            height: celebrate_1.Joi.number().required(),
            width: celebrate_1.Joi.number().required(),
            rooms: celebrate_1.Joi.array().required(),
            grid: celebrate_1.Joi.array().required(),
        }),
    }), async (req, res, next) => {
        const logger = typedi_1.Container.get('logger');
        logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
        try {
            const authServiceInstance = typedi_1.Container.get(floorService_1.default);
            const floorOrError = await authServiceInstance.CreateFloor(req.body);
            if (floorOrError.isFailure) {
                logger.debug(floorOrError.errorValue());
                return res.status(401).send(floorOrError.errorValue());
            }
            const floorDTO = floorOrError.getValue();
            return res.status(201).json({ message: "success", floorDTO });
        }
        catch (e) {
            //logger.error('🔥 error: %o', e);
            return next(e);
        }
    });
    route.put('/update', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            floorName: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required(),
            buildingCode: celebrate_1.Joi.string().required(),
            height: celebrate_1.Joi.number().required(),
            width: celebrate_1.Joi.number().required(),
            rooms: celebrate_1.Joi.array().required(),
            grid: celebrate_1.Joi.array().required(),
        }),
    }), (req, res, next) => ctrl.updateFloor(req, res, next));
    route.patch('/uploadfloormap', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            floorName: celebrate_1.Joi.string().required(),
            grid: celebrate_1.Joi.array().required(),
        }),
    }), (req, res, next) => ctrl.uploadFloorMap(req, res, next));
    route.get('', (req, res, next) => ctrl.getFloor(req, res, next));
    route.get("/getbybuilding", (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            buildingCode: celebrate_1.Joi.string().required(),
        }),
    }), (req, res, next) => ctrl.getFloorsByBuilding(req, res, next));
    route.get("/getbybuildingwithhallway", (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            buildingCode: celebrate_1.Joi.string().required(),
        }),
    }), (req, res, next) => ctrl.getFloorsWithHallwaysByBuilding(req, res, next));
    route.get("/getbybuildingwithelevator", (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            buildingCode: celebrate_1.Joi.string().required(),
        }),
    }), (req, res, next) => ctrl.getFloorsWithElevatorByBuilding(req, res, next));
};
//# sourceMappingURL=floorRoute.js.map