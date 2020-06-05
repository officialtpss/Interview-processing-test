
const { DB_NAME } = require('./../constant/index');
module.exports =  (app) => {
  const MONGO_URI = `mongodb://localhost:27017/${DB_NAME}`;
  const mongoose = require('mongoose');
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);
  mongoose.connect(`${MONGO_URI}`, {
    useNewUrlParser: true,
  },  (err) => {
    if (err) {
      throw(err);
    } else {
      require('./../models/index.js')(mongoose);
      require('./../routes/index.js')(app);
    }
  });
};
