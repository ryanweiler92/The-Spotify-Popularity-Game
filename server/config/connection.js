const mongoose = require('mongoose');


//I don't know if that localhost endpoint is correct?
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/travelplanner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;