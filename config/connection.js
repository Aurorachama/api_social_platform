const { connect, connection } = require('mongoose');

const connectionString =
// env is placeholder at the moment
  process.env.MONGODB_URI || 'mongodb://localhost:27017/studentsDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;