const connection = require('./dbConnect');

const userDB = {
  getUsers: (callback) => {
    connection.query('SELECT * FROM `mydb`.`user`;', (err, data) => {
      if (err) throw err;

      console.log(data);
      callback(data);
    });
  },
};

module.exports = userDB;
