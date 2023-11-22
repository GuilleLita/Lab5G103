import { Request, Response, NextFunction } from 'express';

export default interface IFloorController  {
  createFloor(req: Request, res: Response, next: NextFunction);
  updateFloor(req: Request, res: Response, next: NextFunction);
  getFloorsByBuilding(req: Request, res: Response, next: NextFunction);
  getFloorsWithHallwaysByBuilding(req: Request, res: Response, next: NextFunction);
  getFloorsWithElevatorByBuilding(req: Request, res: Response, next: NextFunction);
  uploadFloorMap(req: Request, res: Response, next: NextFunction);
  getFloor(req: Request, res: Response, next: NextFunction);
}