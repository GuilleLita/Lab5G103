import { ITaskPersistence } from '../../dataschema/ITaskPersistence';
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    taskId: {type: String, unique: true, required: true},
	  taskName: {type: String},
	  buildingsCode: [String],
	  floorsId: [String],
    initialPoint: [Number],
    destinationPoint: [Number],
    status: {type: String},
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ITaskPersistence & mongoose.Document>('Task', TaskSchema);
