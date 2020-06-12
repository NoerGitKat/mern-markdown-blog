const express = require('express');
const articlesRouter = express.Router();

// Controllers
const { getNewArticleForm, createArticle, getNewArticle } = require('./../controllers/articles-controllers');

articlesRouter.route('/new').get(getNewArticleForm).post(createArticle);
articlesRouter.route('/:id').get(getNewArticle);

module.exports = articlesRouter;
