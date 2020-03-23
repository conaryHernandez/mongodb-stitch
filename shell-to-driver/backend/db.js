const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const uri =
  'mongodb+srv://[user]:[pwd]@cluster0-nvbxl.mongodb.net/shop-test?retryWrites=true&w=majority';

let _db;

const initDb = callback => {
  if (_db) {
    console.log('Database is already initialized!');

    return callback(null, _db);
  }
  MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(client => {
      _db = client;
      callback(null, _db);
    })
    .catch(err => {
      console.log(err);
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Database not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};
