import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IRobotDTO} from "../dto/IRobotDTO";

import { Robot } from "../domain/robot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";



export class RobotMap extends Mapper<Robot> {

  public static toDTO( robot: Robot): IRobotDTO {
    return {
      robotId: robot.id.toString(),
	    robotType: robot.robotType,
	    currentlytask: robot.currentlytask,
      currentlyPosition: robot.currentlyPosition,
	    destinationPosition: robot.destinationPosition,
	    status : robot.status
    } as IRobotDTO
  }

  public static async toDomain (raw: any): Promise<Robot> {

    const robotOrError = Robot.create({
      robotId: raw.robotId,
      robotType: raw.robotType,
      currentlytask: raw.currentlytask,
      currentlyPosition: raw.currentlyPosition,
      destinationPosition: raw.destinationPosition,
      status: raw.status,
      
    }, new UniqueEntityID(raw.robotId))

    robotOrError.isFailure ? console.log(robotOrError.error) : '';
    
    return robotOrError.isSuccess ? robotOrError.getValue() : null;
  }

  public static toPersistence (robot: Robot): any {

    const a = {
      robotId: robot.id.toString(),
	    robotType: robot.robotType,
	    currentlytask: robot.currentlytask,
      currentlyPosition: robot.currentlyPosition,
	    destinationPosition: robot.destinationPosition,
	    status : robot.status
    }
    return a;
  }
}