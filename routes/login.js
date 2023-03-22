const express = require('express');
const { loginUser } = require('../controllers/userController');

const router = express.Router();

// 로그인 페이지로 이동
router.get('/', (req, res) => {
  res.render('login');
});

// 리팩토링 후 - 로그인 처리
router.post('/', loginUser);

// 리팩토링 전 - 로그인 처리
// router.post('/', (req, res) => {
//   userController.userCheck(req.body.id, (data) => {
//     if (data.length === 1) {
//       if (data[0].PASSWORD === req.body.password) {
//         // 백엔드 세션 생성
//         req.session.login = true;
//         req.session.userID = req.body.id;

//         // 로그인 쿠키 발행
//         res.cookie('user', req.body.id, {
//           maxAge: 1000 * 5,
//           httpOnly: true,
//           signed: true,
//         });

//         res.status(200).redirect('dbBoard');
//       } else {
//         res
//           .status(400)
//           .send(
//             '비밀번호가 다릅니다. <br/><br/> <a href="/login">로그인 페이지로 이동</a>'
//           );
//       }
//     } else {
//       res
//         .status(400)
//         .send(
//           '해당 id가 존재하지 않습니다. <br/><br/> <a href="/register">회원가입 페이지로 이동</a>'
//         );
//     }
//   });
// });

router.get('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie('user');
    res.redirect('/');
  });
});

module.exports = router;
