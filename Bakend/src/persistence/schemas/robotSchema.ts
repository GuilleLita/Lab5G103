import { IRobotPersistence } from '../../dataschema/IRobotPersistence';
import mongoose from 'mongoose';

const RobotSchema = new mongoose.Schema(
  {
    robotId: {type: String, unique: true, required: true},
	  robotType: {type: String,
                default: 'typerobot'},
	  mark: {type: String},
    model: {type: String},
    currentlytask: {type: String},
    currentlyPosition: [String],
	  destinationPosition: [String],
	  status: {type: String}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', RobotSchema);
