import { IElevatorPersistence } from '../../dataschema/IElevatorPersistence';
import mongoose from 'mongoose';

const ElevatorSchema = new mongoose.Schema(
  {
    ElevatorId: {type: String, unique: true, required: true},
	buildingsId: {type: String},
	floorId: {type: String},
    position: [Number]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IElevatorPersistence & mongoose.Document>('Elevator', ElevatorSchema);
