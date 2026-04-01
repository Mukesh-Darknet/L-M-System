const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    getActiveIssues,
    getMemberships,
    getMediaMasterList,
    getOverdueReturns
} = require('../controllers/reportsController');

const router = express.Router();

router.use(protect);

router.get('/active-issues', getActiveIssues);
router.get('/memberships', getMemberships);
router.get('/media', getMediaMasterList);
router.get('/overdue-returns', getOverdueReturns);

module.exports = router;
