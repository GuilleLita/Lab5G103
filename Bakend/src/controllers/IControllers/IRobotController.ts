import { Request, Response, NextFunction } from 'express';

export default interface IRobotController  {
  createRobot(req: Request, res: Response, next: NextFunction);
  updateRobot(req: Request, res: Response, next: NextFunction);
  getAllRobots(req: Request, res: Response, next: NextFunction);
<<<<<<< HEAD
  getRobotsByTask(req: Request, res: Response, next: NextFunction);
=======
>>>>>>> d85f3cac81f71cd3b22400545dc9f9b1c213c729
 }