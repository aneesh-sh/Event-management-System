import { Router } from 'express';
import { createEvent, getEvents, getEventById } from "../controllers/eventController"
import { createBooking, deleteBooking } from "../controllers/bookingController"

const router = Router();

router.get("/home", (req,res) => {
    res.send("Home Route")
})

router.post('/events', createEvent);
router.get('/events', getEvents);
router.get('/events/:id', getEventById);

router.post('/bookings', createBooking);
router.delete('/bookings/:id', deleteBooking);

export default router;
