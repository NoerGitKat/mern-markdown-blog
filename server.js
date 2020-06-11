const express = require('express');
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Routes
const articlesRouter = require('./routes/articles-router');

app.use('/articles', articlesRouter);

app.get('/', (req, res) => {
	const articles = [
		{ title: 'first article!', createdAt: new Date(), desc: 'this is a nice first article' },
		{ title: 'first article!', createdAt: new Date(), desc: 'this is a nice first article' },
	];
	res.render('articles/index', { articles });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}!`);
});
