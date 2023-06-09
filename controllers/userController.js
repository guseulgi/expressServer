const mongooseConnect = require('./mongooseConnect');
const User = require('../models/user');

mongooseConnect();

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
    // const duplicatedUser = await User.findOne({ id: req.body.id });
    // if (duplicatedUser) return res.status(404).send(REGISTER_DUPLICATED_MSG);

    await User.create(req.body);
    res.status(200).send(REGISTER_SUCCESS_MSG);
  } catch (err) {
    console.error(err);
    res.status(500).send(REGISTER_UNEXPECTED_MSG);
  }
};

// 로그인 기능 추가하기
const loginUser = async (req, res) => {
  try {
    const findUser = await User.findOne({ id: req.body.id });
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

    res.status(200).redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(LOGIN_UNEXPECRED_MSG);
  }
};

module.exports = { registerUser, loginUser };
