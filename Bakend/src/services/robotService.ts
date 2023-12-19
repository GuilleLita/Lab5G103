import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IRobotService from './IServices/IRobotService';
import { RobotMap } from "../mappers/RobotMap";
import { IRobotDTO } from '../dto/IRobotDTO';

import IRobotRepo from './IRepos/IRobotRepo';
import ITypeRobotRepo from './IRepos/ITypeRobotRepo';
import { Robot } from '../domain/robot';
import { TypeRobot } from '../domain/typerobot';


import { Result } from "../core/logic/Result";

@Service()
export default class RobotService implements IRobotService{
  constructor(
      @Inject(config.repos.robot.name) private robotRepo : IRobotRepo,
      @Inject(config.repos.typerobot.name) private typerobotRepo : ITypeRobotRepo,     
      //@Inject(config.repos.Building.name) private BuildingRepo : IBuildingRepo,
      @Inject('logger') private logger,
  ) {}

    public async CreateRobot(robotDTO: IRobotDTO): Promise<Result<{ robotDTO: IRobotDTO; }>> {
      

        const robotOrError = await Robot.create({
          robotId: robotDTO.robotId,
          robotType: robotDTO.robotType,
          currentlytask: robotDTO.currentlytask,
          currentlyPosition: robotDTO.currentlyPosition,
          destinationPosition: robotDTO.destinationPosition,
          status : robotDTO.status
          });

          if (robotOrError.isFailure) {
            throw Result.fail<IRobotDTO>(robotOrError.errorValue());
          }

        
        const robotResult = robotOrError.getValue();
        await this.robotRepo.save(robotResult);
        const robotDTOResult = RobotMap.toDTO( robotResult ) as IRobotDTO;
        return Result.ok<{robotDTO: IRobotDTO}>( {robotDTO: robotDTOResult} )
  }

  public async updateRobot(robotDTO: IRobotDTO): Promise<Result<{ robotDTO: IRobotDTO; }>>  {
    try {
      const Robot = await this.robotRepo.findByDomainId(robotDTO.robotId);
      if (Robot === null) {
        return Result.fail<{robotDTO: IRobotDTO}>("Robot not found");
      }
      else {
        
          Robot.currentlytask= robotDTO.currentlytask;
          Robot.currentlyPosition= robotDTO.currentlyPosition;
          Robot.destinationPosition= robotDTO.destinationPosition;
          Robot.status= robotDTO.status;

        await this.robotRepo.save(Robot);

        const RobotDTOResult = RobotMap.toDTO( Robot ) as IRobotDTO;
        return Result.ok<{robotDTO: IRobotDTO}>( {robotDTO: RobotDTOResult} )
        }
    } catch (e) {
      throw e;
    }
  }

  public async desinhibitRobot(robotId: string): Promise<Result<{ robotDTO: IRobotDTO; }>>  {
    try {
      const Robot = await this.robotRepo.findByDomainId(robotId);
      if (Robot === null) {
        return Result.fail<{ robotDTO: IRobotDTO }>("Robot not found");
      }
      Robot.status = 'working';
  
      await this.robotRepo.save(Robot);
  
      const RobotDTOResult = RobotMap.toDTO(Robot) as IRobotDTO;
      return Result.ok<{ robotDTO: IRobotDTO }>({ robotDTO: RobotDTOResult });
    } catch (e) {
      throw e;
    }
  }

  public async inhibitRobot(robotId: string): Promise<Result<{ robotDTO: IRobotDTO; }>>  {
    try {
      const Robot = await this.robotRepo.findByDomainId(robotId);
      if (Robot === null) {
        return Result.fail<{ robotDTO: IRobotDTO }>("Robot not found");
      }
      Robot.status = 'inhibit';
  
      await this.robotRepo.save(Robot);
  
      const RobotDTOResult = RobotMap.toDTO(Robot) as IRobotDTO;
      return Result.ok<{ robotDTO: IRobotDTO }>({ robotDTO: RobotDTOResult });
    } catch (e) {
      throw e;
    }
  }

  public async getAllRobots(): Promise<Result<{ robotDTO: IRobotDTO[]; }>>  {
    try {
      const Robots = await this.robotRepo.getAll();

      if (Robots === null) {
        return Result.fail<{robotDTO: IRobotDTO[]}>("Robots not found");
      }
      else {
        const RobotsDTOResult = Robots.map( Robot => RobotMap.toDTO( Robot ) as IRobotDTO );
        return Result.ok<{robotDTO: IRobotDTO[]}>( {robotDTO: RobotsDTOResult} )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getRobotsByTask(task: string): Promise<Result<{ robotDTO: IRobotDTO[]; }>>  {
    try {
      const Robots = await this.robotRepo.getRobotsByTask(task);
      const found = !!Robots;
      if (!found) {
        return Result.fail<{robotDTO: IRobotDTO[], token: string}>("Robots with task="+ task + " not found");
      }
      else {
        const RobotsDTOResult = Robots.map( Robot => RobotMap.toDTO( Robot ) as IRobotDTO );
        return Result.ok<{robotDTO: IRobotDTO[]}>( {robotDTO: RobotsDTOResult} )
        }
    } catch (e) {
      throw e;
    }
  }

}
