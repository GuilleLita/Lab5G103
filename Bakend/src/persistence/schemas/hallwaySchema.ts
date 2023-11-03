import { IHallwayPersistence } from '../../dataschema/IHallwayPersistence';
import mongoose from 'mongoose';

const HallwaySchema = new mongoose.Schema(
  {
    hallwayId: {type: String, unique: true, required: true},
	buildingsId: [String],
	floorId: [String],
    position: [Number]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IHallwayPersistence & mongoose.Document>('Hallway', HallwaySchema);
