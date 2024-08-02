import express from 'express';


import dotenv from 'dotenv';


import mongoose from 'mongoose';
import { Event } from './models/event';


import { createEvent, getEventById, getEvents } from './controllers/eventController';
import { createBooking, deleteBooking } from './controllers/bookingController';


dotenv.config();

const app = express();
app.use(express.json());


dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/event-booking-system';

// Define API routes
app.post('/api/events', createEvent);
app.get('/api/events', async(req,res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
      } catch (error:any) {
        res.status(500).json({ message: error.message });
      }
});
app.get('/api/events/:id', getEventById);

app.post('/api/bookings', createBooking);
app.delete('/api/bookings/:id', deleteBooking);

app.get("/home", (req,res) => {
    res.send("Hello World")
})


mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
   
  })
  .catch(error => {
    console.error('Error connecting to MongoDB', error);
  });


export default app;
