import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IHallwayPersistence } from '../dataschema/IHallwayPersistence';
import IHallwayRepo from "../services/IRepos/IHallwayRepo";
import { Hallway } from "../domain/hallway";
import { HallwayId } from "../domain/hallwayId";

import { HallwayMap } from "../mappers/HallwayMap";

@Service()
export default class HallwayRepo implements IHallwayRepo {
  private models: any;

  constructor(
    @Inject('hallwaySchema') private HallwaySchema : Model<IHallwayPersistence & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (hallwayId: HallwayId | string): Promise<boolean> {

    const idX = hallwayId instanceof HallwayId ? (<HallwayId>hallwayId).id.toValue() : HallwayId;

    const query = { domainId: idX}; 
    const HallwayDocument = await this.HallwaySchema.findOne( query );

    return !!HallwayDocument === true;
  }

  public async save (hallway: Hallway): Promise<Hallway> {
    const query = { domainId: hallway.id.toString() }; 

    const HallwayDocument = await this.HallwaySchema.findOne( query );

    try {
      if (HallwayDocument === null ) {
        const rawHallway: any = HallwayMap.toPersistence(hallway);

        const HallwayCreated = await this.HallwaySchema.create(rawHallway);

        return HallwayMap.toDomain(HallwayCreated);
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



  public async findById (hallwayId: HallwayId | string): Promise<Hallway> {

    const idX = hallwayId instanceof HallwayId ? (<HallwayId>hallwayId).id.toValue() : HallwayId;

    const query = { domainId: idX }; 
    const HallwayRecord = await this.HallwaySchema.findOne( query );

    if( HallwayRecord != null) {
      return HallwayMap.toDomain(HallwayRecord);
    }
    else
      return null;
  }
}