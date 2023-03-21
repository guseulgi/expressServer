const mongoClient = require('./mongoConnect');

const userDB = {
  // 중복 회원 찾기
  userCheck: async (userId) => {
    try {
      const client = await mongoClient.connect();
      const user = client.db('kdt5').collection('user');

      const findUser = await user.findOne({ id: userId });
      return findUser;
    } catch (err) {
      console.error(err);
    }
  },
  // 회원가입
  userRegister: async (userInfo) => {
    try {
      const client = await mongoClient.connect();
      const user = client.db('kdt5').collection('user');

      await user.insertOne(userInfo);
      return true;
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = userDB;
