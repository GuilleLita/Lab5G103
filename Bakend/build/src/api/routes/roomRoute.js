"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = require("typedi");
const roomService_1 = __importDefault(require("../../services/roomService"));
const celebrate_1 = require("celebrate");
var room_controller = require('../../controllers/roomController');
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/room', route);
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
            roomId: celebrate_1.Joi.string().required(),
            buildingsId: celebrate_1.Joi.string().required(),
            floorId: celebrate_1.Joi.string().required(),
            position: celebrate_1.Joi.array().required(),
        }),
    }), async (req, res, next) => {
        const logger = typedi_1.Container.get('logger');
        logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
        try {
            const authServiceInstance = typedi_1.Container.get(roomService_1.default);
            const roomOrError = await authServiceInstance.CreateRoom(req.body);
            if (roomOrError.isFailure) {
                logger.debug(roomOrError.errorValue());
                return res.status(401).send(roomOrError.errorValue());
            }
            const roomgDTO = roomOrError.getValue();
            return res.status(201).json({ message: "success", roomgDTO });
        }
        catch (e) {
            //logger.error('🔥 error: %o', e);
            return next(e);
        }
    });
};
//# sourceMappingURL=roomRoute.js.map