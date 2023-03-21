const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://guseulgi:qwer1234@cluster0.y4isdtc.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  try {
    await client.connect();
    const mongo = client.db('kdt5').collection('member');
    await mongo.deleteMany({});
    await mongo.insertMany([
      { name: '최지영', age: 28 },
      { name: '홍성범', age: 32 },
      { name: '김호준', age: 29 },
      { name: '신상아', age: 31 },
    ]);
    await mongo.insertOne({ name: '이유림', age: 26 });
    await mongo.deleteOne({ name: '홍성범' });
    await mongo.updateOne(
      { name: '이유림' },
      { $set: { name: '홍성범', age: 32 } }
    );
    const olderCursor = mongo.find({ age: { $gte: 25 } });
    const older = await olderCursor.toArray();
    console.log(older);
  } catch (err) {
    console.error(err);
  }
}
main();
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
// async function main() {
//   try {
//     await client.connect();
//     const test = client.db('kdt5').collection('test');

//     await test.deleteMany({});
//     await test.insertOne({
//       name: 'pororo',
//       age: 5,
//     });
//   } catch (err) {
//     console.error(err);
//   }
//   client.close();
// }
// main();

// client.connect((err) => {
//   const collection = client.db('kdt5').collection('test');
//   collection.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     collection.insertOne(
//       {
//         name: 'pororo',
//         age: 5,
//       },
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);
//       }
//     );
//   });
// });

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

// async function main() {
//   await client.connect();
//   const test = client.db('kdt5').collection('test');

//   const deleteAllResult = await test.deleteMany({});
//   if (!deleteAllResult.acknowledged) return '삭제 실패';

//   const insertAllResult = await test.insertMany([
//     { name: 'pororo', age: 5 },
//     { name: 'loopy', age: 6 },
//     { name: 'crong', age: 4 },
//   ]);
//   if (!insertAllResult.acknowledged) return '삽입 실패';

//   const deleteManyResult = await test.deleteMany({ age: { $gte: 5 } });
//   if (!deleteManyResult.acknowledged) return '삭제 실패';
//   console.log(deleteManyResult);
// }
// main();

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
// async function main() {
//   await client.connect();
//   const test = client.db('kdt5').collection('test');

//   const deleteAllResult = await test.deleteMany({});
//   if (!deleteAllResult.acknowledged) return '삭제 실패';

//   const insertAllResult = await test.insertMany([
//     { name: 'pororo', age: 5 },
//     { name: 'loopy', age: 6 },
//     { name: 'crong', age: 4 },
//   ]);
//   if (!insertAllResult.acknowledged) return '삽입 실패';

//   const updateManyResult = await test.updateMany(
//     { age: { $gte: 5 } },
//     {
//       $set: {
//         name: '5살 이상인 친구들',
//       },
//     }
//   );
//   if (!updateManyResult.acknowledged) return '삭제 실패';
//   console.log(updateManyResult);
// }
// main();

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

// async function main() {
//   try {
//     await client.connect();
//     const test = client.db('kdt5').collection('test');
//     await test.deleteMany({});
//     await test.insertMany([
//       { name: 'pororo', age: 5 },
//       { name: 'loopy', age: 6 },
//       { name: 'crong', age: 4 },
//     ]);

//     const findCursor = test.find({ age: { $gte: 5 } });
//     const dataArr = await findCursor.toArray();
//     console.log(dataArr);
//   } catch (err) {
//     console.error(err);
//   }
// }
// main();

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
