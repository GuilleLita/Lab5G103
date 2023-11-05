import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IRobotPersistence } from '../dataschema/IRobotPersistence';
import IRobotRepo from "../services/IRepos/IRobotRepo";
import { Robot } from "../domain/robot";
import { RobotId } from "../domain/robotId";

import { RobotMap } from "../mappers/RobotMap";

@Service()
export default class RobotRepo implements IRobotRepo {
  private models: any;

  constructor(
    @Inject('robotSchema') private robotSchema : Model<IRobotPersistence & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (robotId: RobotId | string): Promise<boolean> {

    const idX = robotId instanceof RobotId ? (<RobotId>robotId).id.toValue() : RobotId;

    const query = { domainId: idX}; 
    const RobotDocument = await this.robotSchema.findOne( query );

    return !!RobotDocument === true;
  }

  public async save (robot: Robot): Promise<Robot> {
    const query = { robotId: robot.id.toString() }; 

    const RobotDocument = await this.robotSchema.findOne( query );

    try {
      if (RobotDocument === null ) {
        const rawRobot: any = RobotMap.toPersistence(robot);

        const RobotCreated = await this.robotSchema.create(rawRobot);

        return RobotMap.toDomain(RobotCreated);
      }else {
        RobotDocument.robotType = robot.robotType;
        RobotDocument.taskspermited= robot.taskspermited;
        RobotDocument.currentlytask= robot.currentlytask;
	      RobotDocument.destinationPosition= robot.destinationPosition;
	      RobotDocument.status= robot.status;
        await RobotDocument.save();

        return robot;
      }
    } catch (err) {
      throw err;
    }
  }

  public async saveInhibit(robot: Robot): Promise<Robot> {
    const query = { robotId: robot.id.toString() };
    const robotDocument = await this.robotSchema.findOne(query);
  
    try {
      if (robotDocument === null) {
        const rawRobot: any = RobotMap.toPersistence(robot);
        const robotCreated = await this.robotSchema.create(rawRobot);
        return RobotMap.toDomain(robotCreated);
      } else {
        // Actualizar solo el campo 'status'
        if (robot.status) {
          robotDocument.status = robot.status;
        }
        
        await robotDocument.save();
        return robot;
      }
    } catch (err) {
      throw err;
    }
  }
  



  public async findByDomainId (robotId: RobotId | string): Promise<Robot> {

    const idX = robotId instanceof RobotId ? (<RobotId>robotId).id.toValue() : robotId;

    const query = { robotId: idX }; 
    const RobotRecord = await this.robotSchema.findOne( query );

    if( RobotRecord != null) {
      return RobotMap.toDomain(RobotRecord);
    }
    else
      return null;
  }

  public async getAll (): Promise<Robot[]> {
    const RobotRecord = await this.robotSchema.find();
    const RobotArray : Robot[] = [];
    if( RobotRecord != null) {
      for(var i=0; i< RobotRecord.length; i++){
      RobotArray.push( await RobotMap.toDomain(RobotRecord[i]));
      }

      return RobotArray;
    }
    else
      return null;
  }

  public async getRobotsByTask(task:string): Promise<Robot[]> {
    const query = { taskspermited: { $in: [task] } }; 
    const RobotRecord = await this.robotSchema.find( query );
    const RobotArray : Robot[] = [];
    if( RobotRecord.length > 0) {
      for(var i=0; i< RobotRecord.length; i++){
      RobotArray.push( await RobotMap.toDomain(RobotRecord[i]));
      }

      return RobotArray;
    }
    else
      return null;
  }

}