const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
    addMembership, updateMembership, getMembership,
    addMedia, updateMedia, getMedia,
    addUser, updateUser, getUser
} = require('../controllers/maintenanceController');

const router = express.Router();

router.use(protect, admin);

router.post('/memberships', addMembership);
router.put('/memberships/:memberId', updateMembership);
router.get('/memberships/:memberId', getMembership);

router.post('/media', addMedia);
router.put('/media/:serialNo', updateMedia);
router.get('/media/:serialNo', getMedia);

router.post('/users', addUser);
router.put('/users/:username', updateUser);
router.get('/users/:username', getUser);

module.exports = router;
