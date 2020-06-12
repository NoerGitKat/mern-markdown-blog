// Dependencies
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const app = express();

const connectDB = require('./utils/connectDB');

// Connect to DB
connectDB();

// Controllers
const { getAllArticles } = require('./controllers/articles-controllers');

// Set view engine
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));

// Routes
const articlesRouter = require('./routes/articles-router');
app.use('/articles', articlesRouter);

app.get('/', getAllArticles);

app.get('*', (req, res) => {
	res.redirect('/');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}!`);
});
