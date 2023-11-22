"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
class RoomMap extends Mapper_1.Mapper {
    static toDTO(room) {
        return {
            roomId: room.roomId,
            buildingsId: room.buildingsId,
            floorId: room.floorId,
            position: room.position
        };
    }
    static async toDomain(raw) {
        return null;
    }
    static toPersistence(room) {
        const a = {
            roomId: room.roomId,
            buildingsId: room.buildingsId,
            floorId: room.floorId,
            position: room.position
        };
        return a;
    }
}
exports.RoomMap = RoomMap;
//# sourceMappingURL=RoomMap.js.map