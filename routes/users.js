const express = require('express');

const router = express.Router();

// Temp Data
const USER = [
  {
    id: 'test',
    password: '1234',
    name: '테스트',
  },
  {
    id: 'admin',
    password: '123',
    name: '관리자',
  },
];

router.get('/', (req, res) => {
  if (req.body.id && req.body.password) {
    let findUser = USER.find((value) => {
      return req.body.id === value.id && req.body.password === value.password;
    });
    if (findUser) {
      res.render('users', { USER, findUser });
    } else {
      const err = new Error('로그인 실패');
      err.statusCode = 400;
      throw err;
    }
  } else if (req.query.id && req.query.password) {
    let findUser = USER.find((value) => {
      return req.query.id === value.id && req.query.password === value.password;
    });
    if (findUser) {
      res.render('users', { USER, findUser });
    } else {
      const err = new Error('로그인 실패');
      err.statusCode = 400;
      throw err;
    }
  } else {
    const err = new Error('입력값이 잘못 들어왔습니다.');
    err.statusCode = 400;
    throw err;
  }
});

module.exports = router;
