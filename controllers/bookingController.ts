import { Request, Response } from 'express';
import { Booking } from '../models/booking';
import { Event } from '../models/event';

export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, eventId, quantity } = req.body;

    if (quantity > 15) {
      res.status(400).json({ message: 'Cannot book more than 15 tickets per request' });
      return;
    }

    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    const bookedTickets = event.bookedTickets ?? 0;

    if (bookedTickets + quantity > event.totalTickets) {
      res.status(400).json({ message: 'Not enough tickets available' });
      return;
    }

    event.bookedTickets = bookedTickets + quantity;
    await event.save();

    const booking = new Booking({ userId, eventId, quantity });
    await booking.save();
    res.status(201).json(booking);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    const event = await Event.findById(booking.eventId);
    if (event) {
      const bookedTickets = event.bookedTickets ?? 0;
      event.bookedTickets = Math.max(0, bookedTickets - booking.quantity);
      await event.save();
    }

    res.status(200).json({ message: 'Booking canceled' });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
