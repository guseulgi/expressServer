const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://guseulgi:qwer1234@cluster0.y4isdtc.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db('kdt5').collection('test');
  collection.deleteMany({}, (deleteErr, deleteResult) => {
    if (deleteErr) throw deleteErr;
    console.log('deleteResult', deleteResult);
    collection.insertOne(
      {
        name: '이름',
        nickName: '닉네임',
      },
      (insertErr, insertResult) => {
        if (insertErr) throw insertErr;
        console.log('insertResult', insertResult);
        client.close();
      }
    );
  });
});
