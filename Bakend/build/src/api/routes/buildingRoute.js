"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = require("typedi");
const buildingService_1 = __importDefault(require("../../services/buildingService"));
const celebrate_1 = require("celebrate");
const config_1 = __importDefault(require("../../../config"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/building', route);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.building.name);
    route.post('/create', (0, celebrate_1.celebrate)({
        /*buildingId: string;
    buildingName: string;
    description: string;
    height: number;
    width: number;
    numOfFloors: number;
    floors: string[];
    elevatorFloors : string[];*/
        body: celebrate_1.Joi.object({
            buildingCode: celebrate_1.Joi.string().required(),
            buildingName: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required(),
            height: celebrate_1.Joi.number().required(),
            width: celebrate_1.Joi.number().required(),
            numOfFloors: celebrate_1.Joi.number().required(),
            floors: celebrate_1.Joi.array().required(),
            elevatorFloors: celebrate_1.Joi.array().required(),
        }),
    }), async (req, res, next) => {
        const logger = typedi_1.Container.get('logger');
        logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
        try {
            const authServiceInstance = typedi_1.Container.get(buildingService_1.default);
            const buildingOrError = await authServiceInstance.CreateBuilding(req.body);
            if (buildingOrError.isFailure) {
                logger.debug(buildingOrError.errorValue());
                return res.status(401).send(buildingOrError.errorValue());
            }
            const buildingDTO = buildingOrError.getValue();
            return res.status(201).json({ message: "success", buildingDTO });
        }
        catch (e) {
            //logger.error('🔥 error: %o', e);
            return next(e);
        }
    });
    route.put('/update', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            buildingCode: celebrate_1.Joi.string().required(),
            buildingName: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required(),
            height: celebrate_1.Joi.number().required(),
            width: celebrate_1.Joi.number().required(),
            numOfFloors: celebrate_1.Joi.number().required(),
            floors: celebrate_1.Joi.array().required(),
            elevatorFloors: celebrate_1.Joi.array().required(),
        }),
    }), (req, res, next) => ctrl.updateBuilding(req, res, next));
    route.get('/getall', function (req, res, next) {
        ctrl.getAllBuildings(req, res, next);
    });
    route.get('/getbyminmax', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            min: celebrate_1.Joi.number().required(),
            max: celebrate_1.Joi.number().required(),
        }),
    }), (req, res, next) => ctrl.getBuildingsByMinMax(req, res, next));
};
//# sourceMappingURL=buildingRoute.js.map