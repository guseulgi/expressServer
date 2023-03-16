const connection = require('./dbConnect');

const boardDB = {
  // 모든 게시글 가져오기
  getAllArticle: (cb) => {
    const selectQuery = 'SELECT * FROM mydb.board';
    connection.query(selectQuery, (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },

  // 게시글 추가하기
  writeArticle: (newArticle, cb) => {
    const insertQuery = `INSERT INTO mydb.board (TITLE, CONTENT) VALUE ('${newArticle.title}', '${newArticle.content}');`;
    connection.query(insertQuery, (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },

  // ID_PK로 게시글 찾기
  getArticle: (id, cb) => {
    const findQuery = `SELECT * FROM mydb.board WHERE ID_PK = ${id};`;
    connection.query(findQuery, (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },

  // ID_PK로 게시글 수정하기
  modifyArticle: (id, originArticle, cb) => {
    const modifyQuery = `UPDATE mydb.board SET TITLE = '${originArticle.title}', CONTENT = '${originArticle.content}' WHERE ID_PK = ${id};`;
    connection.query(modifyQuery, (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },

  // ID_PK로 게시글 삭제하기
  deleteArticle: (id, cb) => {
    const deleteQuery = `DELETE FROM mydb.board WHERE ID_PK = ${id};`;
    connection.query(deleteQuery, (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },
};

module.exports = boardDB;
