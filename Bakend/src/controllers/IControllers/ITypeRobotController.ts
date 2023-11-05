import { Request, Response, NextFunction } from 'express';

export default interface ITypeRobotController  {
  createTypeRobot(req: Request, res: Response, next: NextFunction);
  updateTypeRobot(req: Request, res: Response, next: NextFunction);
}