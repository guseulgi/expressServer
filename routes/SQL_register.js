const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  console.log('!');
  // 중복 회원 찾기
  userController.userCheck(req.body.id, (data) => {
    // console.log(data);

    if (data.length === 0) {
      // 회원가입 진행
      userController.userRegister(req.body, (seconddata) => {
        if (seconddata.affectedRows >= 1) {
          console.log(seconddata, '회원 가입 완료');
          res
            .status(200)
            .send(
              '회원 가입 성공! <br/><br/> <a href="/login">로그인으로 이동</a>'
            );
        } else {
          res
            .status(500)
            .send(
              '회원가입 실패, 알 수 없는 문제가 발생하였습니다. <br/><br/> <a href="/register">회원 가입으로 이동</a>'
            );
        }
      });
    } else {
      res
        .status(400)
        .send(
          '회원가입 실패, 동일한 아이디가 존재합니다. <br/><br/> <a href="/register">회원 가입으로 이동</a>'
        );
    }
  });
});

module.exports = router;
