const mongoose = require('mongoose');
const uri = require('./default').mongoURI;

// Connect to MongoDB
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));