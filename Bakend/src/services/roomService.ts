import { Container, Service, Inject } from 'typedi';


import config from '../../config';
import argon2 from 'argon2';

//import MailerService from './mailer.ts.bak';

import IRoomService from './IServices/IRoomService';
import { RoomMap } from "../mappers/RoomMap";
import { IRoomDTO } from '../dto/IRoomDTO';

import IRoomRepo from './IRepos/IRoomRepo';

import { Room } from '../domain/room';


import { Result } from "../core/logic/Result";

@Service()
export default class RoomService implements IRoomService{
  constructor(
      @Inject(config.repos.room.name) private roomRepo : IRoomRepo,
      @Inject('logger') private logger,
  ) {}

    public async CreateRoom(roomDTO: IRoomDTO): Promise<Result<{ roomDTO: IRoomDTO; }>> {


        const RoomOrError = await Room.create({
            roomId: roomDTO.roomId,
            buildingsId: roomDTO.buildingsId,
            floorId: roomDTO.floorId,
            position: roomDTO.position
          });

          if (RoomOrError.isFailure) {
            throw Result.fail<IRoomDTO>(RoomOrError.errorValue());
          }

        
        const RoomResult = RoomOrError.getValue();
        await this.roomRepo.save(RoomResult);
        const RoomDTOResult = RoomMap.toDTO( RoomResult ) as IRoomDTO;
        return Result.ok<{roomDTO: IRoomDTO}>( {roomDTO: RoomDTOResult} )
  }

}
