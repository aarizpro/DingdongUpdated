const CustDetails = require('../models/clientModel')
const asyncHandler = require('express-async-handler')

const getCustDetails = asyncHandler(async(req, res) => {
    try {
        const custdetails = await CustDetails.find({});
        res.status(200).json(custdetails);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});
const createCust = asyncHandler(async(req, res) => {
    try {
        const custdetails = await CustDetails.create(req.body)
        res.status(200).json(custdetails);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})
const getCustDetail = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const custdetails = await CustDetails.findById(id);
        res.status(200).json(custdetails);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});
const updateCust = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const custdetails = await CustDetails.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!custdetails){
            res.status(404);
            throw new Error(`cannot find any product with ID ${id}`);
        }
        const updatedCust = await CustDetails.findById(id);
        res.status(200).json(updatedCust);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});
const deleteCust = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const custdetails = await CustDetails.findByIdAndDelete(id);
        if(!custdetails){
            res.status(404);
            throw new Error(`cannot find any product with ID ${id}`);
        }
        res.status(200).json(custdetails);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})
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
        const users = await CustDetails.find(query).sort(sort);

        // Respond with the results
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = {
    getCustDetails,
    createCust,
    getCustDetail,
    updateCust,
    deleteCust,
    getCoubyField
}