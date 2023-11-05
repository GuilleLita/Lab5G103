import { Request, Response, NextFunction } from 'express';

export default interface IHallwayController  {
  createHallway(req: Request, res: Response, next: NextFunction);
  updateHallway(req: Request, res: Response, next: NextFunction);
  //updateBuilding(req: Request, res: Response, next: NextFunction);
}