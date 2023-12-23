export interface ITaskPersistence {
    taskId: string;
    taskName: string;
    buildingsCode: string[];
    floorsId: string[];
    initialPoint: number[];
    destinationPoint: number[];
    status: string;
}