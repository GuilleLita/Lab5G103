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
        //elevatorId: elevatorDTO.elevatorId,
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
      const found = !!Elevators ;

      if (!found) {
        return Result.fail<{elevatorDTO: IElevatorDTO[]}>("elevator not found with buildingCode=" + buildingCode);
      }

      const ElevatorDTOResult = Elevators.map( Elevator => ElevatorMap.toDTO( Elevator ) as IElevatorDTO);
      return Result.ok<{elevatorDTO: IElevatorDTO[]}>( {elevatorDTO: ElevatorDTOResult} )
    } catch (e) {
      throw e;
    }
  }



  


}
