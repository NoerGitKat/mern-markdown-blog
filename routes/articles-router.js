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
articlesRouter.route('/edit/:id').get(editArticle);
articlesRouter.route('/:slug').get(getNewArticle);
articlesRouter.route('/:id').put(editArticle).delete(deleteArticle);

module.exports = articlesRouter;
