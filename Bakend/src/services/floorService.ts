import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IFloorService from './IServices/IFloorService';
import { FloorMap } from "../mappers/FloorMap";
import { IFloorDTO } from '../dto/IFloorDTO';

import IUserRepo from './IRepos/IUserRepo';
import IRoleRepo from './IRepos/IRoleRepo';
import IFloorRepo from './IRepos/IFloorRepo';

import { Floor } from '../domain/floor';


import { Role } from '../domain/role';

import { Result } from "../core/logic/Result";

@Service()
export default class FloorService implements IFloorService{
  constructor(
      @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
      //@Inject(config.repos.role.name) private roleRepo : IRoleRepo,
      @Inject('logger') private logger,
  ) {}

    public async CreateFloor(floorDTO: IFloorDTO): Promise<Result<{ floorDTO: IFloorDTO; }>> {
      try{
        const floorDocument = await this.floorRepo.findByName( floorDTO.floorName );
        const found = !!floorDocument;

        if (found) {
          return Result.fail<{floorDTO: IFloorDTO, token: string}>("floor already exists with name=" + floorDTO.floorName);
        }

        const FloorOrError = await Floor.create({
            floorName: floorDTO.floorName,
            description: floorDTO.description,
            buildingCode: floorDTO.buildingCode,
            height: floorDTO.height,
            width: floorDTO.width,
            rooms: floorDTO.rooms,
            grid: floorDTO.grid
          });

          if (FloorOrError.isFailure) {
            throw Result.fail<IFloorDTO>(FloorOrError.errorValue());
          }

        
        const FloorResult = FloorOrError.getValue();
        await this.floorRepo.save(FloorResult);
        const FloorDTOResult = FloorMap.toDTO( FloorResult ) as IFloorDTO;
        return Result.ok<{floorDTO: IFloorDTO}>( {floorDTO: FloorDTOResult} )
        }
        catch (e) {
          throw e;
        }
  }

  public async updateFloor(floorDTO: IFloorDTO): Promise<Result<{ floorDTO: IFloorDTO; }>>  {
    try {
      const Floor = await this.floorRepo.findByName(floorDTO.floorName);
      const found = !!Floor === true;

      if (!found) {
        return Result.fail<{floorDTO: IFloorDTO}>("floor not found with name=" + floorDTO.floorName);
      }

      Floor.name = floorDTO.floorName;
      Floor.description = floorDTO.description;
      Floor.buildingCode = floorDTO.buildingCode;
      Floor.height = floorDTO.height;
      Floor.width= floorDTO.width;
      Floor.rooms= floorDTO.rooms;
      Floor.grid= floorDTO.grid;

      await this.floorRepo.save(Floor);
      const FloorDTOResult = FloorMap.toDTO( Floor ) as IFloorDTO;
      return Result.ok<{floorDTO: IFloorDTO}>( {floorDTO: FloorDTOResult} )
    } catch (e) {
      throw e;
    }
  }

}
