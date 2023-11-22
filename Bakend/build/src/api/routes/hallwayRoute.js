"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = require("typedi");
const hallwayService_1 = __importDefault(require("../../services/hallwayService"));
const celebrate_1 = require("celebrate");
const config_1 = __importDefault(require("../../../config"));
var hallway_controller = require('../../controllers/hallwayController');
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/hallway', route);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.hallway.name);
    route.post('/create', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            //hallwayId: Joi.string().required(),
            buildingsCode: celebrate_1.Joi.array().required(),
            floorsId: celebrate_1.Joi.array().required(),
            position: celebrate_1.Joi.array().required()
        }),
    }), async (req, res, next) => {
        const logger = typedi_1.Container.get('logger');
        try {
            const authServiceInstance = typedi_1.Container.get(hallwayService_1.default);
            const hallwayOrError = await authServiceInstance.CreateHallway(req.body);
            if (hallwayOrError.isFailure) {
                logger.debug(hallwayOrError.errorValue());
                return res.status(401).send(hallwayOrError.errorValue());
            }
            const hallwaygDTO = hallwayOrError.getValue();
            return res.status(201).json({ message: "success", hallwaygDTO });
        }
        catch (e) {
            //logger.error('🔥 error: %o', e);
            return next(e);
        }
    });
    route.put('/update', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            hallwayId: celebrate_1.Joi.string().required(),
            buildingsCode: celebrate_1.Joi.array().required(),
            floorsId: celebrate_1.Joi.array().required(),
            position: celebrate_1.Joi.array().required()
        }),
    }), (req, res, next) => ctrl.updateHallway(req, res, next));
    route.get('/getbetweenbuildings', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            building1: celebrate_1.Joi.string().required(),
            building2: celebrate_1.Joi.string().required(),
        }),
    }), (req, res, next) => ctrl.getBetweenBuildings(req, res, next));
};
//# sourceMappingURL=hallwayRoute.js.map