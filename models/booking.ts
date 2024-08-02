import { Schema, model } from 'mongoose';

interface IBooking {
  userId: string;
  eventId: string;
  quantity: number;
  timestamp: Date;
}

const bookingSchema = new Schema<IBooking>({
  userId: { type: String, required: true },
  eventId: { type: String, required: true },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now, required: true }
});

export const Booking = model<IBooking>('Booking', bookingSchema);
