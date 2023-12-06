const express = require('express');
const router = express.Router();
const {validateAddress}=require('../validator/auth')
const {postAddress , getAddress,updateAddress } = require('../controllers/address');
router.post('/address',validateAddress, postAddress);
router.get('/address', getAddress);
router.patch('/address/:id', updateAddress);

module.exports = router;
