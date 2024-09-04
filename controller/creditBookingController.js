const Booking = require('../models/creditBooking')
const asyncHandler = require('express-async-handler')

const getBookingDetails = asyncHandler(async(req, res) => {
    const { sortBy = 'createdAt', sortOrder = 'asc' } = req.query;
    try {
        const courierdetails = await Booking.find({}).sort({ [sortBy]: sortOrder === 'desc' ? 1 : -1 });;
        res.status(200).json(courierdetails);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});
const createBooking = asyncHandler(async(req, res) => {
    try {
        const courierdetails = await Booking.create(req.body)
        res.status(200).json(courierdetails);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})
const getBookingDetail = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const courierdetails = await Booking.findById(id);
        res.status(200).json(courierdetails);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});
const updateBooking = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const courierdetails = await Booking.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!courierdetails){
            res.status(404);
            throw new Error(`cannot find any product with ID ${id}`);
        }
        const updatedCourier = await Booking.findById(id);
        res.status(200).json(updatedCourier);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});
const deleteBooking = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const courierdetails = await Booking.findByIdAndDelete(id);
        if(!courierdetails){
            res.status(404);
            throw new Error(`cannot find any product with ID ${id}`);
        }
        res.status(200).json(courierdetails);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})
// const getCoubyField = asyncHandler(async (req, res) => {
//     const { field, value } = req.query;
//     try {
//         if (!Array.isArray(field) || !Array.isArray(value)) {
//             res.status(400).json({ error: "Fields and values must be arrays" });
//             return;
//         }
//         const query = {};
//         field.forEach((f, index) => {
//             query[f] = value[index];
//         });
//         const users = await Booking.find(query);
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });
const getCoubyField = asyncHandler(async (req, res) => {
    const { field, value, sortBy, sortOrder } = req.query;
    
    try {
        // Validate field and value arrays
        if (!Array.isArray(field) || !Array.isArray(value)) {
            return res.status(400).json({ error: "Fields and values must be arrays" });
        }
        
        // Construct the query object for searching
        const query = {};
        field.forEach((f, index) => {
            query[f] = value[index];
        });

        // Construct sorting object
        let sort = {};
        if (Array.isArray(sortBy) && Array.isArray(sortOrder)) {
            sortBy.forEach((sortField, index) => {
                const order = sortOrder[index] === 'desc' ? -1 : 1;
                sort[sortField] = order;
            });
        }

        // Fetch results from the database with query and sorting
        const users = await Booking.find(query).sort(sort);

        // Respond with the results
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = {
    getBookingDetails,
    createBooking,
    getBookingDetail,
    updateBooking,
    deleteBooking,
    getCoubyField
}