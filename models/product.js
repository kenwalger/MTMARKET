var mongoose = require('mongoose');

//ProductSchema
var productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},

	cost: {
		type: Number,
		required: true
	},

	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},

	location: {
		type: String,
		required: true
	},

	description: {
		type: String,
		required: true
	}
});

productSchema.method("update", function(updates, callback) {
	Object.assign(this, updates, {updatedAt: new Date()});
	this.parent().save(callback);
});

var Product = mongoose.model('Product', productSchema);
module.exports = Product;
