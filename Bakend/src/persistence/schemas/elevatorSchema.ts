import { IElevatorPersistence } from '../../dataschema/IElevatorPersistence';
import mongoose from 'mongoose';

const ElevatorSchema = new mongoose.Schema(
  {
    elevatorId: {type: String, unique: true, required: true},
	  buildingId: {type: String},
	  floorId: {type: String},
    position: [Number]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IElevatorPersistence & mongoose.Document>('Elevator', ElevatorSchema);
