"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bcrypt = require("bcryptjs");
var userSchema = new _mongoose2.default.Schema({
    shopName: String,
    email: String,
    password: String,
    discount: Number,
    isAdmin: { type: Boolean, default: false }
});
userSchema.set('timestamps', true);

userSchema.statics.passwordMatches = function (password, encryptedPassword) {
    // bcrypt.compare(password, encryptedPassword, function (err, result) {
    //     if (result == true) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    //     })
    if (bcrypt.compareSync(password, encryptedPassword)) {
        return true;
    } else {
        return false;
    }
};

userSchema.pre('save', function (next) {

    this.shopName = this.shopName.toLowerCase();
    // bcrypt.hash(this.password, 10, (err, encrypted) => {
    //     this.password = encrypted;
    //     console.log(this.password);
    //     next();
    // });
    // var salt = bcrypt.genSaltSync(10);
    // this.password  = bcrypt.hashSync(this.password, salt);
    // next();
    var hash = bcrypt.hashSync(this.password, 10);
    this.password = hash;
    next();
});
exports.default = _mongoose2.default.model('user', userSchema);