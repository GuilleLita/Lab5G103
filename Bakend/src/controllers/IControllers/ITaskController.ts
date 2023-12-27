import { Request, Response, NextFunction } from 'express';

export default interface ITaskController  {
  createTask(req: Request, res: Response, next: NextFunction);
  updateTask(req: Request, res: Response, next: NextFunction);
  updateTaskStatus(req: Request, res: Response, next: NextFunction);
  getTaskId(req: Request, res: Response, next: NextFunction);
  getTasksByStatus(req: Request, res: Response, next: NextFunction);

  //getElevatorsByBuilding(req: Request, res: Response, next: NextFunction);
}