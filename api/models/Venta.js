const mongoose = require('mongoose');
const VentasSchema = mongoose.Schema({
    buyerData: {
        buyerEmail: {
            type: String,
            required: true,
            trim: true,
        },
        buyerDate: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        buyerName: {
            type: String,
            required: true,
            trim: true,
        },
        buyerLastName: {
            type: String,
            required: true,
            trim: true,
        },
        buyerId: {
            type: mongoose.Types.ObjectId,
            ref: 'Usuario',
        },
        registerBuy: {
            type: Date,
            default: Date.now(),
        },
    },
    buyerShipping: {
        buyerAddress1: {
            type: String,
            required: true,
            trim: true,
        },
        buyerAddress2: {
            type: String,
            trim: true,
        },
        buyerCity: {
            type: String,
            required: true,
            trim: true,
        },
        buyerState: {
            type: String,
            required: true,
            trim: true,
        },
        buyerZip: {
            type: String,
            required: true,
            trim: true,
        },
        buyerShippingIntructions: {
            type: String,
            trim: true,
        },
    },
    buyerCard: {
        buyerCardNumber: {
            type: String,
            required: true,
            trim: true,
        },
        buyerCardName: {
            type: String,
            required: true,
            trim: true,
        },
        buyerCardDate: {
            type: String,
            required: true,
            trim: true,
        },
        buyerCardCode: {
            type: String,
            required: true,
            trim: true,
        },
    },
    productsList: {
        type: Array,
    },
});

module.exports = mongoose.model('Venta', VentasSchema);
