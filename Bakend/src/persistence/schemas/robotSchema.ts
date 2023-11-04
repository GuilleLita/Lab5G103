import { IRobotPersistence } from '../../dataschema/IRobotPersistence';
import mongoose from 'mongoose';

const RobotSchema = new mongoose.Schema(
  {
    robotId: {type: String, unique: true, required: true},
	  robotType: {type: String},
	  mark: {type: String},
    model: {type: Number},
    taskspermited: {type: Number},
    currentlytask: {type: Number},
	  destinationPosition: [String],
	  status: [String]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', RobotSchema);
