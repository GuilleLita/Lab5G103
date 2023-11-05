import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IHallwayService from './IServices/IHallwayService';
import { HallwayMap } from "../mappers/HallwayMap";
import { IHallwayDTO } from '../dto/IHallwayDTO';

import IBuildingRepo from './IRepos/IBuildingRepo';
import IFloorRepo from './IRepos/IFloorRepo';
import IHallwayRepo from './IRepos/IHallwayRepo';

import { Hallway } from '../domain/hallway';


import { Role } from '../domain/role';

import { Result } from "../core/logic/Result";

@Service()
export default class HallwayService implements IHallwayService{
  constructor(
      @Inject(config.repos.hallway.name) private hallwayRepo : IHallwayRepo,
      @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo,
      @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
      //@Inject(config.repos.role.name) private roleRepo : IRoleRepo,
      @Inject('logger') private logger,
  ) {}

  private comprobarHallway(hallwayDTO: IHallwayDTO): boolean{
    if(hallwayDTO.buildingsCode.length != 2){
      return false;
    }
    if(hallwayDTO.floorsId.length != 2){
      return false;
    }
    for(let i = 0; i < hallwayDTO.buildingsCode.length; i++){
      if(this.buildingRepo.findByCode(hallwayDTO.buildingsCode[i]) == null){
        return false;
      }
      if(this.floorRepo.findById(hallwayDTO.floorsId[i]) == null){
        return false;
      }
    }
    return true;
  }


    public async CreateHallway(hallwayDTO: IHallwayDTO): Promise<Result<{ hallwayDTO: IHallwayDTO; }>> {
      try{

        if(!this.comprobarHallway(hallwayDTO)){
          return Result.fail<{hallwayDTO: IHallwayDTO}>("Hallway is not valid");
        }

        const hallwayOrError = await Hallway.create({
            //hallwayId: hallwayDTO.hallwayId,
            buildingsCode: hallwayDTO.buildingsCode,
            floorsId: hallwayDTO.floorsId,
            position: hallwayDTO.position
          });

          if (hallwayOrError.isFailure) {
            throw Result.fail<IHallwayDTO>(hallwayOrError.errorValue());
          }

        
        const hallwayResult = hallwayOrError.getValue();
        await this.hallwayRepo.save(hallwayResult);
        const hallwayDTOResult = HallwayMap.toDTO( hallwayResult ) as IHallwayDTO;
        return Result.ok<{hallwayDTO: IHallwayDTO}>( {hallwayDTO: hallwayDTOResult} )
        } catch (e) {
          throw e;
        }
  }

  public async UpdateHallway(hallwayDTO: IHallwayDTO): Promise<Result<{ hallwayDTO: IHallwayDTO; }>>  {
    try {
      const hallway = await this.hallwayRepo.findById(hallwayDTO.hallwayId);
      const found = !!hallway === true;

      if (!found) {
        return Result.fail<{hallwayDTO: IHallwayDTO}>("Hallway not found with id=" + hallwayDTO.hallwayId);
      }

      hallway.buildingsCode = hallwayDTO.buildingsCode;
      hallway.floorsId = hallwayDTO.floorsId;
      hallway.position = hallwayDTO.position;

      await this.hallwayRepo.save(hallway);

      const hallwayDTOResult = HallwayMap.toDTO( hallway ) as IHallwayDTO;
      return Result.ok<{hallwayDTO: IHallwayDTO}>( {hallwayDTO: hallwayDTOResult} )
      } catch (e) {
        throw e;
      }
  }

  existsHallwayswhithFloor(floorId: string): Promise<Result<boolean>> {
    throw new Error('Method not implemented.');
  }


}
