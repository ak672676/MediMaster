'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var medicineSchema = new _mongoose2.default.Schema({
    name: String,
    composition: String,
    packing: String,
    company: String,
    mrp: Number,
    rate: Number
});

medicineSchema.set('timestamps', true);
medicineSchema.pre('save', function (next) {
    this.name = this.name.toLowerCase();
    this.composition = this.composition.toLowerCase();
    this.company = this.company.toLowerCase();
    next();
});
exports.default = _mongoose2.default.model('medicine', medicineSchema);