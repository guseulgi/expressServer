const express = require('express');
const { registerUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

// 리팩토링 후
router.post('/', registerUser);

// 리팩토링 전
// router.post('/', async (req, res) => {
//   // 중복 회원 찾기
//   const duplicatedUser = await userController.userCheck(req.body.id);
//   if (!duplicatedUser) {
//     const registerResult = await userController.userRegister(req.body);
//     if (registerResult) {
//       res
//         .status(200)
//         .send(
//           '회원 가입 성공! <br/><br/> <a href="/login">로그인으로 이동</a>'
//         );
//     } else {
//       res
//         .status(500)
//         .send(
//           '회원가입 실패, 알 수 없는 문제가 발생하였습니다. <br/><br/> <a href="/register">회원 가입으로 이동</a>'
//         );
//     }
//   } else {
//     res
//       .status(400)
//       .send(
//         '회원가입 실패, 동일한 아이디가 존재합니다. <br/><br/> <a href="/register">회원 가입으로 이동</a>'
//       );
//   }
// });

module.exports = router;
