import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IRobotDTO} from "../dto/IRobotDTO";

import { Robot } from "../domain/robot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";


import TypeRobotRepo from "../repos/typerobotRepo";

export class RobotMap extends Mapper<Robot> {

  public static toDTO( robot: Robot): IRobotDTO {
    return {
      robotId: robot.id.toString(),
	    robotType: robot.typerobot.robotType.toValue(),
	    taskspermited: robot.taskspermited,
	    currentlytask: robot.currentlytask,
	    destinationPosition: robot.destinationPosition,
	    status : robot.status
    } as IRobotDTO
  }

  public static async toDomain (raw: any): Promise<Robot> {
    const repo = Container.get(TypeRobotRepo);
    const typerobot = await repo.findByrobotType(raw.robotType);
    //NO SE SI ES ESO O typerobot

    const robotOrError = Robot.create({
      robotId: raw.robotId,
	    robotType: typerobot,
	    taskspermited:  raw.taskspermited,
	    currentlytask: raw.currentlytask,
	    destinationPosition: raw.destinationPosition,
	    status : raw.status
    }, new UniqueEntityID(raw.robotId))

    robotOrError.isFailure ? console.log(robotOrError.error) : '';
    
    return robotOrError.isSuccess ? robotOrError.getValue() : null;
  }

  public static toPersistence (robot: Robot): any {

    const a = {
      robotId: robot.id.toString(),
	    robotType: robot.typerobot.robotType.toValue(),
	    taskspermited: robot.taskspermited,
	    currentlytask: robot.currentlytask,
	    destinationPosition: robot.destinationPosition,
	    status : robot.status
    }
    return a;
  }
}