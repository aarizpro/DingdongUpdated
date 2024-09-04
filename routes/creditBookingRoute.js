const express = require('express');
const {
    getBookingDetails,     // Fixing the mismatch in function names
    createBooking,
    getBookingDetail,
    updateBooking,
    deleteBooking,
    getCoubyField
} = require('../controller/creditBookingController');

const router = express.Router();

// Define routes with the correct function names from the controller
router.get('/', getBookingDetails);
router.get('/search', getCoubyField);
router.get('/:id', getBookingDetail);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);
router.post('/', createBooking);

module.exports = router;
