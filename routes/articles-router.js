const express = require('express');
const articlesRouter = express.Router();

// Controllers

articlesRouter.route('/new').get();

module.exports = articlesRouter;
