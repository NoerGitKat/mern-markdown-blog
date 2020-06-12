const slugify = require('slugify');
const marked = require('marked'); // Converts markdown to HTML
const { JSDOM } = require('jsdom'); // Emulates web browser
const createDOMPurifier = require('dompurify'); // Helps sanitize HTML
const domPurifier = createDOMPurifier(new JSDOM().window);

const Article = require('./../models/Article');

const getAllArticles = async (req, res) => {
	try {
		const articles = await Article.find().sort({ createdAt: 'desc' });
		res.render('articles/index', { articles });
	} catch (err) {
		console.log(err);
	}
};

const getNewArticleForm = (req, res) => {
	res.render('articles/new', { article: new Article() });
};

const getNewArticle = async (req, res) => {
	const { slug } = req.params;
	try {
		const foundArticle = await Article.findOne({ slug });

		if (foundArticle) {
			res.render('articles/show-article', { article: foundArticle });
		}
	} catch (err) {
		res.redirect('/');
	}
};

const createArticle = async (req, res) => {
	const { title, description, markdown } = req.body;

	const mdHTML = marked(markdown);

	let newArticle = new Article({
		title,
		description,
		markdown,
		slug: slugify(title, { lower: true, strict: true }),
		sanitizedHTML: domPurifier.sanitize(mdHTML),
	});

	try {
		newArticle = await newArticle.save();
		res.redirect(`/articles/${newArticle.slug}`);
	} catch (err) {
		console.log(err);
		res.render('articles/new', { article: newArticle });
	}
};

const editArticle = async (req, res) => {
	const { id } = req.params;
	try {
		const foundArticle = await Article.findById(id);
		console.log('foundArticle', foundArticle);
		res.render('articles/edit', { article: foundArticle });
	} catch (err) {
		console.log(err);
	}
};

const deleteArticle = async (req, res) => {
	const { id } = req.params;
	try {
		await Article.findByIdAndDelete(id);
		res.redirect('/');
	} catch (err) {
		console.log(err);
	}
};

exports.getAllArticles = getAllArticles;
exports.getNewArticleForm = getNewArticleForm;
exports.getNewArticle = getNewArticle;
exports.createArticle = createArticle;
exports.editArticle = editArticle;
exports.deleteArticle = deleteArticle;
