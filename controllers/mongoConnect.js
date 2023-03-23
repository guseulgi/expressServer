const { MongoClient, ServerApiVersion } = require('mongodb');
const { MDB_URI } = process.env;

const client = new MongoClient(MDB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
