import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';
import mongoose from 'mongoose';

const BuildingSchema = new mongoose.Schema(
  {
    buildingCode: {type: String, unique: true, required: true, maxLength: 5},
	  buildingName: {type: String},
	  description: {type: String},
    height: {type: Number},
    width: {type: Number},
    numOfFloors: {type: Number},
	  floors: [String],
	  elevatorFloors: [String]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', BuildingSchema);
