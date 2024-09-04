const mongoose = require('mongoose')

const clientSchema = mongoose.Schema(
    {
        clientMob: {
            type: String,
            required: [true,"Enter Customer Details"]
            
        },
        clientName: {
            type: String,
            required: [true,"Enter Customer Details"]
            
        },
        clientAddr: {
            type: String,
            required: [true,"Please Enter Customer Address"]
            
        },
        clientPincode: {
            type: String,
            required: [true,"Please Enter Customer Email"]
        },
        clientEmail: {
            type: String,
            required: [true,"Please Enter Customer Email"]
        }    },
    {
        timestamps: true
    }
)


const ClientDetails = mongoose.model('ClientDetails', clientSchema);

module.exports = ClientDetails;