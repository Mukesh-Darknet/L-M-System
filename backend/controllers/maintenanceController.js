const Membership = require('../models/Membership');
const Media = require('../models/Media');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Memberships
const addMembership = async (req, res) => {
    try {
        const { memberId, name, contact, duration } = req.body;

        const exists = await Membership.findOne({ memberId });
        if (exists) {
            return res.status(400).json({ message: 'Membership ID already exists' });
        }

        const d = new Date();
        const endDate = new Date(d.setMonth(d.getMonth() + parseInt(duration)));

        const membership = await Membership.create({
            memberId, name, contact, duration, endDate
        });

        res.status(201).json(membership);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMembership = async (req, res) => {
    try {
        const { memberId } = req.params;
        const { action } = req.body; // 'extend' or 'cancel'

        const membership = await Membership.findOne({ memberId });
        if (!membership) return res.status(404).json({ message: 'Membership not found' });

        if (action === 'extend') {
            const d = new Date(membership.endDate);
            // Default 6 months extension
            membership.endDate = new Date(d.setMonth(d.getMonth() + 6));
            membership.status = 'active';
        } else if (action === 'cancel') {
            membership.status = 'cancelled';
        }

        await membership.save();
        res.json(membership);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMembership = async (req, res) => {
    try {
        const membership = await Membership.findOne({ memberId: req.params.memberId });
        if (!membership) return res.status(404).json({ message: 'Not found' });
        res.json(membership);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Media (Books/Movies)
const addMedia = async (req, res) => {
    try {
        const { type, title, authorOrDirector, serialNo } = req.body;
        const exists = await Media.findOne({ serialNo });
        if (exists) return res.status(400).json({ message: 'Serial No already exists' });

        const media = await Media.create({ type, title, authorOrDirector, serialNo });
        res.status(201).json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMedia = async (req, res) => {
    try {
        const { serialNo } = req.params;
        const updates = req.body;

        const media = await Media.findOneAndUpdate({ serialNo }, updates, { new: true });
        if (!media) return res.status(404).json({ message: 'Media not found' });

        res.json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMedia = async (req, res) => {
    try {
        const media = await Media.findOne({ serialNo: req.params.serialNo });
        if (!media) return res.status(404).json({ message: 'Media not found' });
        res.json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Users
const addUser = async (req, res) => {
    try {
        const { name, username, password, role } = req.body;
        const exists = await User.findOne({ username });
        if (exists) return res.status(400).json({ message: 'User exists' });

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.create({ name, username, password: passwordHash, role });
        res.status(201).json({ id: user._id, name: user.name, username: user.username, role: user.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { username } = req.params;
        const { name, role, status } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (name) user.name = name;
        if (role) user.role = role;
        if (status) user.status = status;

        await user.save();
        res.json({ id: user._id, name: user.name, username: user.username, role: user.role, status: user.status });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addMembership, updateMembership, getMembership,
    addMedia, updateMedia, getMedia,
    addUser, updateUser, getUser
};
