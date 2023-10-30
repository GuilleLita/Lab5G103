import { IFloorPersistence } from '../../dataschema/IFloorPersistence';
import mongoose from 'mongoose';

const FloorSchema = new mongoose.Schema(
  {
	floorId: {type: String, unique: true, required: true},
    floorName: {type: String},
    description: {type: String},
    height: {type: Number},
    width: {type: Number},
    rooms: [String],
    grid: [[Number]],
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor', FloorSchema);