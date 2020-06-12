const mongoose = require('mongoose');

const slugify = require('slugify');




const Schema = mongoose.Schema;

const articleSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	markdown: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
	},
	slug: {
		type: String,
		required: true,
		unique: true,
	},
	sanitizedHTML: {
		type: String,
		required: true,
	},
});

articleSchema.pre('validate', (next) => {
	if (this.title) {
		this.slug = slugify(this.title, { lower: true, strict: true });
	}

	if (this.markdown) {
		const mdHTML = marked(this.markdown);
		this.sanitizedHTML = domPurifier.sanitize(mdHTML);
	}

	next();
});

const articleModel = mongoose.model('articles', articleSchema);

module.exports = articleModel;
