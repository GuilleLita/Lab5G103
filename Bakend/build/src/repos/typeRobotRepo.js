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
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const TypeRobotMap_1 = require("../mappers/TypeRobotMap");
const mongoose_1 = require("mongoose");
let TypeRobotRepo = class TypeRobotRepo {
    constructor(typerobotSchema) {
        this.typerobotSchema = typerobotSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(typerobot) {
        const robotType = typerobot.robotType; // Obtén el valor del atributo robotType desde el objeto 
        // Construye la consulta utilizando robotType en lugar de id
        const query = { robotType: robotType };
        // Realiza la búsqueda utilizando el atributo robotType
        const typerobotDocument = await this.typerobotSchema.findOne(query);
        return !!typerobotDocument === true;
    }
    async save(typerobot) {
        const query = { robotType: typerobot.robotType };
        const typerobotDocument = await this.typerobotSchema.findOne(query);
        try {
            if (typerobotDocument === null) {
                const rawTypeRobot = TypeRobotMap_1.TypeRobotMap.toPersistence(typerobot);
                const typerobotCreated = await this.typerobotSchema.create(rawTypeRobot);
                return TypeRobotMap_1.TypeRobotMap.toDomain(typerobotCreated);
            }
            else {
                typerobotDocument.mark = typerobot.mark;
                typerobotDocument.model = typerobot.model;
                typerobotDocument.taskspermited = typerobot.taskspermited;
                await typerobotDocument.save();
                return typerobot;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByrobotType(robotType) {
        const idX = robotType;
        const query = { robotType: idX };
        const TypeRobotRecord = await this.typerobotSchema.findOne(query);
        if (TypeRobotRecord != null) {
            return TypeRobotMap_1.TypeRobotMap.toDomain(TypeRobotRecord);
        }
        else
            return null;
    }
};
TypeRobotRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('typerobotSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], TypeRobotRepo);
exports.default = TypeRobotRepo;
//# sourceMappingURL=typeRobotRepo.js.map