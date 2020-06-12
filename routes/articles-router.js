const express = require('express');
const articlesRouter = express.Router();

// Controllers
const {
	getNewArticleForm,
	createArticle,
	getNewArticle,
	deleteArticle,
	editArticle,
} = require('./../controllers/articles-controllers');

articlesRouter.route('/new').get(getNewArticleForm).post(createArticle);
articlesRouter.route('/:slug').get(getNewArticle).post(editArticle);
articlesRouter.route('/:id').delete(deleteArticle);

module.exports = articlesRouter;
