const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    checkAvailability,
    issueMedia,
    getTransactionBySerialNo,
    returnMedia,
    payFine
} = require('../controllers/transactionsController');

const router = express.Router();

router.use(protect); 

router.get('/availability', checkAvailability);
router.post('/issue', issueMedia);
router.get('/issued/:serialNo', getTransactionBySerialNo);
router.post('/return', returnMedia);
router.post('/pay-fine', payFine);

module.exports = router;
