import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IRobotDTO} from "../dto/IRobotDTO";

import { Robot } from "../domain/robot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";


import RobotRepo from "../repos/robotRepo";

export class RobotMap extends Mapper<Robot> {

  public static toDTO( robot: Robot): IRobotDTO {
    return {
      robotId: robot.id.toString(),
	    robotType: robot.robotType,
	    mark:  robot.mark,
	    model: robot.model,
	    taskspermited: robot.taskspermited,
	    currentlytask: robot.currentlytask,
	    destinationPosition: robot.destinationPosition,
	    status : robot.status
    } as IRobotDTO
  }

  public static async toDomain (raw: any): Promise<Robot> {
    //const buildingEmailOrError = buildingEmail.create(raw.email);
    //const buildingPasswordOrError = buildingPassword.create({value: raw.password, hashed: true});
    //const repo = Container.get(RoleRepo);
    //const role = await repo.findByDomainId(raw.role);

    const robotOrError = Robot.create({
      robotId: raw.robotId,
	    robotType: raw.robotType,
	    mark:  raw.mark,
	    model: raw.model,
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
	    robotType: robot.robotType,
	    mark:  robot.mark,
	    model: robot.model,
	    taskspermited: robot.taskspermited,
	    currentlytask: robot.currentlytask,
	    destinationPosition: robot.destinationPosition,
	    status : robot.status
    }
    return a;
  }
}