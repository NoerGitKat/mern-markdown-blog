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

	let newArticle = new Article({
		title,
		description,
		markdown,
		slug: title,
	});

	try {
		newArticle = await newArticle.save();
		res.redirect(`/articles/${newArticle.slug}`);
	} catch (err) {
		console.log(err);
		res.render('articles/new', { article: newArticle });
	}
};

const editArticle = (req, res) => {};

const deleteArticle = (req, res) => {};

exports.getAllArticles = getAllArticles;
exports.getNewArticleForm = getNewArticleForm;
exports.getNewArticle = getNewArticle;
exports.createArticle = createArticle;
exports.editArticle = editArticle;
exports.deleteArticle = deleteArticle;
