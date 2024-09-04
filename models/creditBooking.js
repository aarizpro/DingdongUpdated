const mongoose = require('mongoose')

const creditBookingSchema = mongoose.Schema(
    {
        crcustCode: {
            type: String,
            required: [true,"Enter Customer Details"]
            
        },
        crcustName: {
            type: String,
            required: [true,"Enter Customer Details"]
            
        },
        crcustAddr: {
            type: String,
            required: [true,"Please Enter Customer Address"]
            
        },
        crcustMob: {
            type: Number,
            required: true,
            default:0
        },
        crcustEmail: {
            type: String,
            required: [true,"Please Enter Customer Email"]
        },
        crcustPincode: {
            type: Number,
            required: true,
            default:0
        },
        toMob: {
            type: Number,
            required: true,
            default:0
        },
        toName: {
            type: String,
            required: [true,"Please Enter Customer Email"]
        },
        toAddr: {
            type: String,
            required: [true,"Please Enter Customer Email"]
        },
        toEmail: {
            type: String,
            required: [true,"Please Enter Customer Email"]
        },
        toPincode: {
            type: String,
            required: [true,"Please Enter Customer Email"]
        },
        amount: {
            type: String,
            required: [true,"Please Enter Customer Email"]
        },
        awbno: {
            type: String,
            required: [true,"Please Enter Customer Email"]
        },
        courier: {
            type: String,
            required: [true,"Please Enter Customer Email"]
        },
        weight: {
            type: String,
            required: [true,"Please Enter Customer Email"]
        },
        quantity: {
            type: String,
            required: [true,"Please Enter Customer Email"]
        }
    },
    {
        timestamps: true
    }
)


const CreditbookDetails = mongoose.model('CreditbookDetails', creditBookingSchema);

module.exports = CreditbookDetails;