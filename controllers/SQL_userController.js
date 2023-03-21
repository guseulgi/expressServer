const connection = require('./dbConnect');

const userDB = {
  // 중복 회원 찾기
  userCheck: (userId, cb) => {
    const checkQuery = `SELECT * FROM mydb.user WHERE USERID = '${userId}'`;
    connection.query(checkQuery, (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },

  // 회원가입
  userRegister: (userInfo, cb) => {
    const registerQuery = `INSERT INTO mydb.user (USERID, PASSWORD) VALUES ('${userInfo.id}','${userInfo.password}');`;
    connection.query(registerQuery, (err, data) => {
      if (err) throw data;
      cb(data);
    });
  },
};

module.exports = userDB;
