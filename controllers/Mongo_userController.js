const mongoClient = require('./mongoConnect');
const REGISTER_SUCCESS_MSG =
  '회원 가입 성공! <br/><br/> <a href="/login">로그인으로 이동</a>';
const REGISTER_DUPLICATED_MSG =
  '회원가입 실패, 동일한 아이디가 존재합니다. <br/><br/> <a href="/register">회원 가입으로 이동</a>';
const REGISTER_UNEXPECTED_MSG =
  '회원가입 실패, 알 수 없는 문제가 발생하였습니다. <br/><br/> <a href="/register">회원 가입으로 이동</a>';
const LOGIN_FAIL_MSG =
  '아이디 혹은 비밀번호가 다릅니다. <br/><br/> <a href="/login">로그인 페이지로 이동</a>';
const LOGIN_UNEXPECRED_MSG =
  '로그인 실패, 알 수 없는 문제가 발생하였습니다. <br/><br/> <a href="/login">로그인으로 이동</a>';
const LOGIN_NOT_REGISTERED_MSG =
  '로그인 실패, 해당 아이디를 가진 회원이 존재하지 않습니다. <br/><br/> <a href="/register">회원 가입으로 이동</a>';
const LOGIN_NOT_PASSWORD_MSG =
  '로그인 실패, 비밀번호가 일치하지 않습니다. <br/><br/> <a href="/register">회원 가입으로 이동</a>';

// 리팩토링 후
// 회원가입
const registerUser = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const user = client.db('kdt5').collection('user');
    const duplicatedUser = await user.findOne({ id: req.body.id });

    if (duplicatedUser) return res.status(404).send(REGISTER_DUPLICATED_MSG);

    await user.insertOne(req.body);
    res.status(200).send(REGISTER_SUCCESS_MSG);
  } catch (err) {
    console.error(err);
    res.status(500).send(REGISTER_UNEXPECTED_MSG);
  }
};

// 로그인 기능 추가하기
const loginUser = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const user = await client.db('kdt5').collection('user');
    // const correctUser = await user.findOne({
    //   id: req.body.id,
    //   password: req.body.password,
    // });
    // // id와 비번이 같은 유저를 찾으면,
    // if (correctUser) {
    //   // 백엔드 세션 만들기
    //   req.session.login = true;
    //   req.session.userId = req.body.id;
    //   // 로그인 쿠키 만들기
    //   res.cookie('user', req.body.id, {
    //     maxAge: 1000 * 10,
    //     httpOnly: true,
    //     signed: true,
    //   });
    //   res.status(200).redirect('/dbBoard');
    // } else {
    //   res.status(400).send(LOGIN_FAIL_MSG);
    // }
    const findUser = await user.findOne({ id: req.body.id });
    if (!findUser) return res.status(400).send(LOGIN_NOT_REGISTERED_MSG);

    if (findUser.password !== req.body.password)
      return res.status(400).send(LOGIN_NOT_PASSWORD_MSG);

    req.session.login = true;
    req.session.userId = req.body.id;
    res.cookie('user', req.body.id, {
      maxAge: 1000 * 5,
      httpOnly: true,
      signed: true,
    });
    // res.status(200).send('로그인 성공');
    res.status(200).redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(LOGIN_UNEXPECRED_MSG);
  }
};

// 리팩토링 전
// const userDB = {
//   // 중복 회원 찾기
//   userCheck: async (userId) => {
//     try {
//       const client = await mongoClient.connect();
//       const user = client.db('kdt5').collection('user');

//       const findUser = await user.findOne({ id: userId });
//       return findUser;
//     } catch (err) {
//       console.error(err);
//     }
//   },
//   // 회원가입
//   userRegister: async (userInfo) => {
//     try {
//       const client = await mongoClient.connect();
//       const user = client.db('kdt5').collection('user');

//       await user.insertOne(userInfo);
//       return true;
//     } catch (err) {
//       console.error(err);
//     }
//   },
// };
// module.exports = userDB;

module.exports = { registerUser, loginUser };
