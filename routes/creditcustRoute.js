const express = require('express')
const CustDetails = require('../models/creditCustomerModel')
const{getCustDetails,createCust,getCustDetail,updateCust,deleteCust,getCoubyField} = require('../controller/creditcustController')
const router = express.Router();

router.get('/',getCustDetails);
router.get('/search', getCoubyField);
router.get('/:id',getCustDetail);
router.put('/:id',updateCust);
router.delete('/:id',deleteCust);
router.post('/', createCust);
module.exports = router;