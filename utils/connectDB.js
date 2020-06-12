const mongoose = require('mongoose');

const connectDB = async () => {
	const DB_URL = process.env.DB_URL || 'mongodb://localhost/md-blog';
	const DB_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };
	try {
		await mongoose.connect(DB_URL, DB_OPTIONS);
		console.log('DB is connected!');
		return;
	} catch (err) {
		console.log(err);
		return;
	}
};

module.exports = connectDB;
