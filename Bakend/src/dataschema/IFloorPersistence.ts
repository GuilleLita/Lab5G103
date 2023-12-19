export interface IFloorPersistence {
    floorId: string;
    floorName: string;
    buildingCode: string;
    description: string;
    height: number;
    width: number;
    rooms: string[];
    grid: number[][];
}