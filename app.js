const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = 4000;

const mainRouter = require('./routes/index');
const userRouter = require('./routes/users');
const boardRouter = require('./routes/board');
const userDBRouter = require('./routes/db');
const DBBoardRouter = require('./routes/dbBoard');
const cookieRouter = require('./routes/cookie');

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', mainRouter);
app.use('/users', userRouter);
app.use('/board', boardRouter);
app.use('/data', userDBRouter);
app.use('/dbBoard', DBBoardRouter);
app.use('/cookie', cookieRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.render(err.message);
});

app.listen(PORT, () => {
  console.log(`${PORT} 에서 서버 구동 중. . .`);
});
