const { MongoClient, ServerApiVersion } = require('mongodb');
const { MDB_URI } = process.env;

const client = new MongoClient(MDB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// client.connect((err) => {
//   const mongo = client.db('kdt5').collection('member');
//   mongo.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;

//     mongo.insertMany(
//       [
//         { name: '최지영', age: 28 },
//         { name: '홍성범', age: 32 },
//         { name: '김호준', age: 29 },
//         { name: '신상아', age: 31 },
//       ],
//       (insertManyErr, insertManyResult) => {
//         if (insertManyErr) throw insertManyErr;

//         mongo.insertOne(
//           { name: '이유림', age: 26 },
//           (insertOneErr, insertOneResult) => {
//             if (insertOneErr) throw insertOneErr;

//             mongo.deleteOne(
//               { name: '홍성범' },
//               (deleteOneErr, deleteOneResult) => {
//                 if (deleteOneErr) throw deleteOneErr;

//                 mongo.updateOne(
//                   { name: '이유림' },
//                   { $set: { name: '홍성범', age: 32 } },
//                   (updateErr, updateResult) => {
//                     if (updateErr) throw updateErr;

//                     const findCursor = mongo.find({ age: { $gte: 25 } });
//                     findCursor.toArray((findErr, findData) => {
//                       console.log(findData);
//                     });
//                   }
//                 );
//               }
//             );
//           }
//         );
//       }
//     );
//   });
// });

// insertOne
client.connect((err) => {
  const collection = client.db('kdt5').collection('test');
  collection.deleteMany({}, (deleteErr, deleteResult) => {
    if (deleteErr) throw deleteErr;
    console.log(deleteResult);

    collection.insertOne(
      {
        name: 'pororo',
        age: 5,
      },
      (insertErr, insertResult) => {
        if (insertErr) throw insertErr;
        console.log(insertResult);
      }
    );
  });
});

// insertMany
// client.connect((err) => {
//   const collection = client.db('kdt5').collection('test');
//   collection.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     collection.insertMany(
//       [
//         {
//           name: 'pororo',
//           age: 5,
//         },
//         {
//           name: 'loopy',
//           age: 6,
//         },
//         {
//           name: 'poby',
//           age: 7,
//         },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);
//       }
//     );
//   });
// });

// delete
// const collection = client.db('kdt5').collection('test');
// collection.deleteMany({}, (deleteErr, deleteResult) => {
//   if (deleteErr) throw deleteErr;
//   console.log(deleteResult);

//   collection.insertMany(
//     [
//       {
//         name: 'pororo',
//         age: 5,
//       },
//       {
//         name: 'loopy',
//         age: 6,
//       },
//       {
//         name: 'poby',
//         age: 7,
//       },
//     ],
//     (insertErr, insertResult) => {
//       if (insertErr) throw insertErr;
//       console.log(insertResult);
//       collection.deleteMany(
//         { age: { $gte: 6 } },
//         (deleteManyErr, deleteManyResult) => {
//           if (deleteManyErr) throw deleteManyErr;
//           console.log(deleteManyResult);

//           client.close();
//         }
//       );
//     }
//   );
// });

// update
// client.connect((err) => {
//   const collection = client.db('kdt5').collection('test');
//   collection.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     collection.insertMany(
//       [
//         {
//           name: 'pororo',
//           age: 5,
//         },
//         {
//           name: 'loopy',
//           age: 6,
//         },
//         {
//           name: 'poby',
//           age: 7,
//         },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);
//         collection.updateOne(
//           { name: 'loopy' },
//           {
//             $set: { name: '루피' },
//           },
//           (updateOneErr, updateOneResult) => {
//             if (updateOneErr) throw updateOneErr;
//             console.log(updateOneResult);
//           }
//         );
//       }
//     );
//   });
// });

// updateMany
// client.connect((err) => {
//   const collection = client.db('kdt5').collection('test');
//   collection.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     collection.insertMany(
//       [
//         {
//           name: 'pororo',
//           age: 5,
//         },
//         {
//           name: 'loopy',
//           age: 6,
//         },
//         {
//           name: 'poby',
//           age: 7,
//         },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);
//         collection.updateMany(
//           { age: { $gte: 6 } },
//           {
//             $set: { name: '6살 이상인 친구들' },
//           },
//           (updateOneErr, updateOneResult) => {
//             if (updateOneErr) throw updateOneErr;
//             console.log(updateOneResult);
//           }
//         );
//       }
//     );
//   });
// });

// findOne
// client.connect((err) => {
//   const collection = client.db('kdt5').collection('test');
//   collection.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     collection.insertMany(
//       [
//         {
//           name: 'pororo',
//           age: 5,
//         },
//         {
//           name: 'loopy',
//           age: 6,
//         },
//         {
//           name: 'poby',
//           age: 7,
//         },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);
//         collection.find({ name: 'loopy' }, (findErr, findData) => {
//           if (findErr) throw findErr;
//           console.log(findData);
//         });
//       }
//     );
//   });
// });

// find
// client.connect((err) => {
//   const collection = client.db('kdt5').collection('test');
//   collection.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     collection.insertMany(
//       [
//         {
//           name: 'pororo',
//           age: 5,
//         },
//         {
//           name: 'loopy',
//           age: 6,
//         },
//         {
//           name: 'poby',
//           age: 7,
//         },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         // console.log(insertResult);
//         const findCursor = collection.find({ name: 'loopy' });
//         console.log(findCursor);
//         findCursor.toArray((findErr, findData) => {
//           console.log(findData);
//         });
//       }
//     );
//   });
// });
