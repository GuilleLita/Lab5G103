import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IRoomPersistence } from '../dataschema/IRoomPersitence';
import IRoomRepo from "../services/IRepos/IRoomRepo";
import { Room } from "../domain/room";
import { RoomId } from "../domain/roomId";

import { RoomMap } from "../mappers/RoomMap";

@Service()
export default class RoomRepo implements IRoomRepo {
  private models: any;

  constructor(
    @Inject('roomSchema') private RoomSchema : Model<IRoomPersistence & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (roomId: RoomId | string): Promise<boolean> {

    const idX = roomId instanceof RoomId ? (<RoomId>roomId).id.toValue() : RoomId;

    const query = { domainId: idX}; 
    const RoomDocument = await this.RoomSchema.findOne( query );

    return !!RoomDocument === true;
  }

  public async save (room: Room): Promise<Room> {
    const query = { domainId: room.id.toString() }; 

    const RoomDocument = await this.RoomSchema.findOne( query );

    try {
      if (RoomDocument === null ) {
        const rawRoom: any = RoomMap.toPersistence(room);

        const RoomCreated = await this.RoomSchema.create(rawRoom);

        return RoomMap.toDomain(RoomCreated);
      }/*else {
        BuildingDocument.firstName = building.firstName;
        BuildingDocument.lastName = building.lastName;
        await BuildingDocument.save();

        return building;
      }*/
    } catch (err) {
      throw err;
    }
  }



  public async findById (roomId: RoomId | string): Promise<Room> {

    const idX = roomId instanceof RoomId ? (<RoomId>roomId).id.toValue() : RoomId;

    const query = { domainId: idX }; 
    const RoomRecord = await this.RoomSchema.findOne( query );

    if( RoomRecord != null) {
      return RoomMap.toDomain(RoomRecord);
    }
    else
      return null;
  }
}