import mongoose, { Model, Schema } from 'mongoose';
import { IPostCode, IPoint } from '../interfaces';

const pointSchema: Schema<IPoint> = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

const PostCodeSchema: Schema<IPostCode> = new Schema({
    postcode: { type: String, required: true },
    data: { type: Object, required: true },
    points: { type: [pointSchema], required: false, default: [] },
    location: {
        type: pointSchema,
        index: '2dsphere'
      }
});

const PostCode: Model<IPostCode> = mongoose.model('PostCode', PostCodeSchema);

export default PostCode;