const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pryce: {
        type: Number,
        default: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String
    },
    stock: {
        type: Boolean,
        default: true
    }
});

ProductSchema.methos.toJSON = function() {
    const { __v, status, ...data } = this.toObject();

    return data;
};

module.exports = model( 'Product', ProductSchema);