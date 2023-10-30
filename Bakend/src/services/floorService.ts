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


        const FloorOrError = await Floor.create({
            floorId: floorDTO.floorId,
            floorName: floorDTO.floorName,
            description: floorDTO.description,
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

}
