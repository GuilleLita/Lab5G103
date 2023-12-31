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
    const query = { hallwayId: hallway.id.toString() }; 

    const HallwayDocument = await this.HallwaySchema.findOne( query );

    try {
      if (HallwayDocument === null ) {
        const rawHallway: any = HallwayMap.toPersistence(hallway);

        const HallwayCreated = await this.HallwaySchema.create(rawHallway);

        return HallwayMap.toDomain(HallwayCreated);
      }else {
        HallwayDocument.buildingsCode = hallway.buildingsCode;
        HallwayDocument.floorsId = hallway.floorsId;
        HallwayDocument.position = hallway.position;
        await HallwayDocument.save();
        return hallway;
      }
    } catch (err) {
      throw err;
    }
  }



  public async findById (_hallwayId: HallwayId | string): Promise<Hallway> {

    const idX = _hallwayId instanceof HallwayId ? (<HallwayId>_hallwayId).id.toValue() : _hallwayId;

    const query = { hallwayId: idX }; 
    const HallwayRecord = await this.HallwaySchema.findOne( query );

    if( HallwayRecord != null) {
      return HallwayMap.toDomain(HallwayRecord);
    }
    else
      return null;
  }

  public async existsWithFloor (floorId: string): Promise<boolean> {

    const query = { floorsId: floorId }; 
    const HallwayRecord = await this.HallwaySchema.findOne( query );

    if( HallwayRecord != null) {
      return true;
    }
    else
      return false;
  }

  public async  findByBuildings(code1: string, code2: string): Promise<Hallway[]> {
      const query = { buildingsCode: { $in: [code1, code2] } };
      const HallwayRecord = await this.HallwaySchema.find( query );

      const Hallways: Hallway[] = [];

      if( HallwayRecord != null) {
        for (let i = 0; i < HallwayRecord.length; i++) {
          Hallways.push(await HallwayMap.toDomain(HallwayRecord[i]));
        }
        return Hallways;
      }
      else
        return null;
  }
}