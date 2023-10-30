export interface IFloorPersistence {
    floorId: string;
    floorName: string;
    description: string;
    height: number;
    width: number;
    rooms: string[];
    grid: string[][];
}