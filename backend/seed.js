const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/lmsystem');

        const exists = await User.findOne({ username: 'admin' });
        if (exists) {
            console.log('Admin already exists!');
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('admin123', salt);

        await User.create({
            name: 'System Admin',
            username: 'admin',
            password: passwordHash,
            role: 'admin'
        });

        console.log('Admin user seeded successfully. Username: admin, Password: admin123');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAdmin();
