const mongoose = require('mongoose');

const mongoUrl = 'mongodb://127.0.0.1/aepi';

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});