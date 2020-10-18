"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = index;

var _stringUtil = require("../../utilities/string-util");

var _userModel = require("../../model/user-model");

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
    var validation = validateIndex(req.body);
    if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
    }

    var user = new _userModel2.default({
        shopName: req.body.shopName.toLowerCase(),
        email: req.body.email,
        password: req.body.password,
        discount: req.body.discount,
        isAdmin: req.body.isAdmin
    });

    _userModel2.default.find({ email: req.body.email }, function (error, shop) {

        if (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        console.log(shop);
        if (shop.length > 0) {
            return res.status(403).json({ message: "Shop Already Exist" });
        }
        user.save(function (error) {
            if (error) {
                if (error.code === 11000) {
                    return res.status(403).json({ message: "Shop Already Exist" });
                }
                return res.status(500).json({ message: "Internal Server Error" });
            }
            return res.status(201).json({ message: "Successfully made a new customer" });
        });
        // return res.status(201).json({message:"Successfully made a new customer"});
    });
}

function validateIndex(body) {
    var errors = '';
    if (_stringUtil.StringUtil.isEmpty(body.shopName)) {
        errors += 'Username is required. ';
    }
    if (_stringUtil.StringUtil.isEmpty(body.password)) {
        errors += 'Password is required. ';
    }
    if (_stringUtil.StringUtil.isEmpty(body.email)) {
        errors += 'First name is required. ';
    }
    return {
        isValid: _stringUtil.StringUtil.isEmpty(errors),
        message: errors
    };
}