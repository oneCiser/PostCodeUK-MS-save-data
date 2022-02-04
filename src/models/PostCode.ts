import mongoose, { Model, Schema } from 'mongoose';
import { IPostCode, IPoint } from '../interfaces';

const PostCodeSchema: Schema<IPostCode> = new Schema({
    postcode: { type: String, required: true },
    data: { type: Object, required: true },
    points: { type: Array, required: false, default: [] },
    nearestRadius: { type: Number, required: true, default: 0 },
    lat: { type: Number, required: true, default: 0 },
    lon: { type: Number, required: true, default: 0 }
});

const PostCode: Model<IPostCode> = mongoose.model('PostCode', PostCodeSchema);

export default PostCode;