import { IRoomPersistence } from '../../dataschema/IRoomPersitence';
import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema(
  {
    roomId: {type: String, unique: true, required: true},
	buildingsId: {type: String},
	floorId: {type: String},
    position: [Number]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IRoomPersistence & mongoose.Document>('Room', RoomSchema);
