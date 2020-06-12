const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

const connectDB = require('./utils/connectDB');

// Routes
const articlesRouter = require('./routes/articles-router');

// Set view engine
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use('/articles', articlesRouter);

// Connect to DB
connectDB();

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
