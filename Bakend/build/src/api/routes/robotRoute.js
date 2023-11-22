"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = require("typedi");
const robotService_1 = __importDefault(require("../../services/robotService"));
const celebrate_1 = require("celebrate");
const config_1 = __importDefault(require("../../../config"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/robot', route);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.robot.name);
    route.post('/create', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            //buildingId: Joi.string().required(),
            robotType: celebrate_1.Joi.string().required(),
            currentlytask: celebrate_1.Joi.string().required(),
            currentlyPosition: celebrate_1.Joi.array().required(),
            destinationPosition: celebrate_1.Joi.array().required(),
            status: celebrate_1.Joi.string().required(),
        }),
    }), async (req, res, next) => {
        const logger = typedi_1.Container.get('logger');
        try {
            const authServiceInstance = typedi_1.Container.get(robotService_1.default);
            const robotOrError = await authServiceInstance.CreateRobot(req.body);
            if (robotOrError.isFailure) {
                logger.debug(robotOrError.errorValue());
                return res.status(401).send(robotOrError.errorValue());
            }
            const robotDTO = robotOrError.getValue();
            return res.status(201).json({ message: "success", robotDTO });
        }
        catch (e) {
            //logger.error('🔥 error: %o', e);
            return next(e);
        }
    });
    //you can`t update the task if the robot is inhibit
    //you have to update everytime to move
    route.put('/updatetask', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            currentlytask: celebrate_1.Joi.string().required(),
            currentlyPosition: celebrate_1.Joi.array().required(),
            destinationPosition: celebrate_1.Joi.array().required(),
            status: celebrate_1.Joi.string().required(),
        }),
    }), (req, res, next) => ctrl.updateRobot(req, res, next));
    route.patch('/inhibit', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            robotId: celebrate_1.Joi.string().required(),
            //status: Joi.string().required(),
        }),
    }), (req, res, next) => {
        ctrl.inhibitRobot(req, res, next);
    });
    route.patch('/desinhibit', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            robotId: celebrate_1.Joi.string().required(),
        }),
    }), (req, res, next) => {
        ctrl.desinhibitRobot(req, res, next);
    });
    route.get('/getall', function (req, res, next) {
        ctrl.getAllRobots(req, res, next);
    });
    route.get('/getbytask', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            task: celebrate_1.Joi.number().required(),
        }),
    }), (req, res, next) => ctrl.getRobotsByTask(req, res, next));
};
//# sourceMappingURL=robotRoute.js.map