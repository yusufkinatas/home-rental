import { model, Model, Schema, Document } from 'mongoose';
import { IApartment } from './apartment.types';

export type ApartmentDocument = Document<any, any, IApartment> & IApartment;

interface ApartmentModel extends Model<IApartment, unknown, unknown> {
  findByCredentials: (email: string, password: string) => Promise<ApartmentDocument>;
}

const schema = new Schema<IApartment, ApartmentModel>({
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, required: true },
  },
  dateAdded: {
    type: Date,
    default: new Date(),
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  isRented: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  realtorId: {
    type: String,
    required: true,
  },
  floorAreaSize: {
    type: Number,
    required: true,
    min: 1,
  },
  monthlyPrice: {
    type: Number,
    required: true,
    min: 1,
  },
  numberOfRooms: {
    type: Number,
    required: true,
    min: 1,
  },
});

export const Apartment = model<IApartment, ApartmentModel>('Apartment', schema);
