const express = require('express');

const router = express.Router();

const ARTICLE = [
  {
    title: '첫글 제목',
    content: '첫글 내용입니다.',
  },
  {
    title: '두번째글 제목',
    content: '두번째글 내용입니다.',
  },
];

router.get('/', (req, res) => {
  res.render('board', { ARTICLE, articleCounts: ARTICLE.length });
});

// 글쓰기 이동
router.get('/write', (req, res) => {
  res.render('board_write');
});

// 글 추가
router.post('/write', (req, res) => {
  if (req.body.title && req.body.content) {
    const newArticle = {
      title: req.body.title,
      content: req.body.content,
    };
    ARTICLE.push(newArticle);
    res.redirect('/board');
  } else {
    const err = new Error('글 쓰기 오류');
    err.statusCode = 404;
    throw err;
  }
});

// 글 수정 이동
router.get('/modify/:title', (req, res) => {
  const arrIndex = ARTICLE.findIndex(
    (value) => value.title === req.params.title
  );
  const findArticle = ARTICLE[arrIndex];
  res.render('board_modify', { findArticle });
});

// 글 수정
router.post('/modify/:title', (req, res) => {
  if (req.body.title && req.body.content) {
    const arrIndex = ARTICLE.findIndex(
      (value) => req.params.title === value.title
    );
    ARTICLE[arrIndex] = {
      title: req.body.title,
      content: req.body.content,
    };
    res.redirect('/board');
  } else {
    const err = new Error('글 수정 오류');
    err.statusCode = 404;
    throw err;
  }
});

// 글 삭제
router.delete('/delete/:title', (req, res) => {
  const arrIndex = ARTICLE.findIndex(
    (value) => req.params.title === value.title
  );

  ARTICLE.splice(arrIndex, 1);
  res.send('삭제 완료');
});

module.exports = router;
