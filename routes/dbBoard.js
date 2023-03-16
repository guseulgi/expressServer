const express = require('express');
const boardDB = require('../controllers/boardController');

const router = express.Router();

// 게시판 페이지 호출
router.get('/', (req, res) => {
  boardDB.getAllArticle((data) => {
    // data 는 하나씩 오는 게 아니라 배열 형태로 오게된다!!!!!
    const ARTICLE = data;
    const articleCounts = ARTICLE.length;
    res.render('db_board', {
      ARTICLE,
      articleCounts,
    });
  });
});

// 글쓰기 페이지 호출
router.get('/write', (req, res) => {
  res.render('db_board_write');
});

// 데이터베이스에 쓴 글을 넣어주기
router.post('/write', (req, res) => {
  if (req.body.title && req.body.content) {
    boardDB.writeArticle(req.body, (data) => {
      if (data.affectedRows >= 1) {
        res.redirect('/dbBoard');
      } else {
        const err = new Error('글 쓰기 실패.');
        err.statusCode = 500;
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 없습니다.');
    err.statusCode = 400;
    throw err;
  }
});

// 수정 페이지 호출
router.get('/modify/:id', (req, res) => {
  boardDB.getArticle(req.params.id, (data) => {
    if (data.length > 0) {
      res.render('db_board_modify', { findArticle: data[0] });
    } else {
      const err = new Error('게시글 찾기 실패');
      err.statusCode = 500;
      throw err;
    }
  });
});

// 글 수정하기
router.post('/modify/:id', (req, res) => {
  if (req.body.title && req.body.content) {
    boardDB.modifyArticle(req.params.id, req.body, (data) => {
      if (data.affectedRows >= 1) {
        res.redirect('/dbBoard');
      } else {
        const err = new Error('게시글 수정 실패');
        err.statusCode = 500;
        throw err;
      }
    });
  } else {
    const err = new Error('게시글 요청 실패');
    err.statusCode = 400;
    throw err;
  }
});

// 글 삭제하기
router.delete('/delete/:id', (req, res) => {
  boardDB.deleteArticle(req.params.id, (data) => {
    if (data.affectedRows >= 1) {
      res.status(200).send('게시글 삭제 완료');
    } else {
      const err = new Error('게시글 삭제 실패');
      err.statusCode = 500;
      throw err;
    }
  });
});

router.get('/getAll', (req, res) => {
  boardDB.getAllArticle((data) => {
    res.send(data);
  });
});

module.exports = router;
