const Article = require('./../models/Article');

const getNewArticleForm = (req, res) => {
	res.render('articles/new', { article: new Article() });
};

const getNewArticle = async (req, res) => {
	const { id } = req.params;
	try {
		const foundArticle = await Article.findById(id);
		if (foundArticle) {
			res.render('articles/show-article', { article: foundArticle });
		}
	} catch (err) {
		// res.redirect('/');
	}
};

const createArticle = async (req, res) => {
	const { title, description, markdown } = req.body;

	let newArticle = new Article({
		title,
		description,
		markdown,
	});

	try {
		newArticle = await newArticle.save();
		res.redirect(`/articles/${newArticle.id}`);
	} catch (err) {
		res.render('articles/new', { article: newArticle });
	}
};

const editArticle = (req, res) => {};

const deleteArticle = (req, res) => {};

exports.getNewArticleForm = getNewArticleForm;
exports.getNewArticle = getNewArticle;
exports.createArticle = createArticle;
exports.editArticle = editArticle;
exports.deleteArticle = deleteArticle;
