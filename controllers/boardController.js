const { ObjectId } = require('mongodb');
const mongoClient = require('./mongoConnect');

const UNEXPECTED_MSG = '<br/><a href="/">메인 페이지로 이동</a>';

// 리팩토링 후
// 모든 게시글 가져오기
const getAllArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = await client.db('kdt5').collection('board');
    const articleCursor = board.find({});
    const ARTICLE = await articleCursor.toArray();
    res.render('db_board', {
      ARTICLE,
      articleCounts: ARTICLE.length,
      userID: req.session.userId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

// 리팩토링 전 - 모든 게시글 가져오기
// const boardDB = {
//   // 모든 게시글 가져오기
//   getAllArticle: (cb) => {
//     const selectQuery = 'SELECT * FROM mydb.board';
//     connection.query(selectQuery, (err, data) => {
//       if (err) throw err;
//       cb(data);
//     });
//   },

// 리팩토링 후 - 게시글 추가
const writeArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = await client.db('kdt5').collection('board');

    console.log(req.file);

    await board.insertOne({
      USERID: req.session.userId,
      TITLE: req.body.title,
      CONTENT: req.body.content,
      IMAGE: req.file ? req.file.filename : null,
    });
    res.status(200).redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};
//   // 리팩토링 전 - 게시글 추가하기
//   writeArticle: (newArticle, cb) => {
//     const insertQuery = `INSERT INTO mydb.board (TITLE, CONTENT, USERID) VALUE ('${newArticle.title}', '${newArticle.content}', '${newArticle.userID}');`;
//     connection.query(insertQuery, (err, data) => {
//       if (err) throw err;
//       cb(data);
//     });
//   },

// 리팩토링 후 - 특정 게시글 찾기
const getArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = await client.db('kdt5').collection('board');

    const findArticle = await board.findOne({
      _id: ObjectId(req.params.id),
    });
    res.render('db_board_modify', { findArticle });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

//   // ID_PK로 게시글 찾기
//   getArticle: (id, cb) => {
//     const findQuery = `SELECT * FROM mydb.board WHERE ID_PK = ${id};`;
//     connection.query(findQuery, (err, data) => {
//       if (err) throw err;
//       cb(data);
//     });
//   },

const modifyArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = await client.db('kdt5').collection('board');

    // const originArticle = await board.findOne({
    //   _id: ObjectId(req.params.id),
    // });

    const modiryArti = {
      TITLE: req.body.title,
      CONTENT: req.body.content,
    };
    if (req.file) modiryArti.IMAGE = req.file.filename;

    await board.updateOne(
      {
        _id: ObjectId(req.params.id),
      },
      {
        // $set: {
        //   TITLE: req.body.title,
        //   CONTENT: req.body.content,
        //   IMAGE: req.file ? req.file.filename : originArticle.IMAGE,
        // },
        $set: modiryArti,
      }
    );
    res.status(200).redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

//   // ID_PK로 게시글 수정하기
//   modifyArticle: (id, originArticle, cb) => {
//     const modifyQuery = `UPDATE mydb.board SET TITLE = '${originArticle.title}', CONTENT = '${originArticle.content}' WHERE ID_PK = ${id};`;
//     connection.query(modifyQuery, (err, data) => {
//       if (err) throw err;
//       cb(data);
//     });
//   },

const deleteArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = await client.db('kdt5').collection('board');

    await board.deleteOne({
      _id: ObjectId(req.params.id),
    });
    res.status(200).json('삭제 성공');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

//   // ID_PK로 게시글 삭제하기
//   deleteArticle: (id, cb) => {
//     const deleteQuery = `DELETE FROM mydb.board WHERE ID_PK = ${id};`;
//     connection.query(deleteQuery, (err, data) => {
//       if (err) throw err;
//       cb(data);
//     });
//   },
// };
// module.exports = boardDB;

module.exports = {
  getAllArticle,
  writeArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
};
