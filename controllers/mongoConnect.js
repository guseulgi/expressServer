const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://guseulgi:qwer1234@cluster0.y4isdtc.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
