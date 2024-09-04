const mongoose = require('mongoose')

const creditCustomerSchema = mongoose.Schema(
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
        }
    },
    {
        timestamps: true
    }
)


const CreditcustDetails = mongoose.model('CreditcustDetails', creditCustomerSchema);

module.exports = CreditcustDetails;