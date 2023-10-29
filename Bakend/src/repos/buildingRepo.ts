import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistance';
import IBuildingRepo from "../services/IRepos/IBuildingRepo";
import { Building } from "../domain/building";
import { BuildingId } from "../domain/buildingId";

import { BuildingMap } from "../mappers/BuildingMap";

@Service()
export default class BuildingRepo implements IBuildingRepo {
  private models: any;

  constructor(
    @Inject('buildingSchema') private BuildingSchema : Model<IBuildingPersistence & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (buildingId: BuildingId | string): Promise<boolean> {

    const idX = buildingId instanceof BuildingId ? (<BuildingId>buildingId).id.toValue() : BuildingId;

    const query = { domainId: idX}; 
    const BuildingDocument = await this.BuildingSchema.findOne( query );

    return !!BuildingDocument === true;
  }

  public async save (building: Building): Promise<Building> {
    const query = { domainId: building.id.toString() }; 

    const BuildingDocument = await this.BuildingSchema.findOne( query );

    try {
      if (BuildingDocument === null ) {
        const rawBuilding: any = BuildingMap.toPersistence(building);

        const BuildingCreated = await this.BuildingSchema.create(rawBuilding);

        return BuildingMap.toDomain(BuildingCreated);
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



  public async findById (buildingId: BuildingId | string): Promise<Building> {

    const idX = buildingId instanceof BuildingId ? (<BuildingId>buildingId).id.toValue() : BuildingId;

    const query = { domainId: idX }; 
    const BuildingRecord = await this.BuildingSchema.findOne( query );

    if( BuildingRecord != null) {
      return BuildingMap.toDomain(BuildingRecord);
    }
    else
      return null;
  }
}