import { ITypeRobotPersistence } from '../../dataschema/ITypeRobotPersistence';
import mongoose from 'mongoose';

const TypeRobotSchema = new mongoose.Schema(
  {
    robotType: { type: String, unique: true },
    mark: { type: String },
    model: { type: String},
    taskspermited: { type: [String] }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ITypeRobotPersistence & mongoose.Document>('TypeRobot', TypeRobotSchema);
