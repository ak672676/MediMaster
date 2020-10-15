"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = index;
exports.getShopById = getShopById;
exports.search = search;
exports.updateLedger = updateLedger;

var _userModel = require("../../model/user-model");

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {

    return res.json({ message: 'Helloss World' });
}

function getShopById(req, res) {

    _userModel2.default.findOne({ _id: req.params.id }, function (error, shop) {
        if (error) {
            return res.status(500).json();
        }
        if (!shop) {
            return res.status(404).json({ message: "AMIT" });
        }
        return res.status(200).json({ shop: shop });
    });
}

function search(req, res) {
    // let shops=[];
    _userModel2.default.find({ "shopName": { $regex: req.params.keyword, $options: 'i' } }, function (error, shops) {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ shops: shops });
    });
}

function updateLedger(req, res) {
    var shopId = req.body.shopId;
    var newEntry = req.body.newEntry;
    _userModel2.default.findOne({ _id: shopId }, function (error, shop) {
        if (error) {
            return res.status(500).json();
        }
        var ledger = shop.ledger;
        newEntry.total = 0;
        if (ledger.length == 0) {
            if (newEntry.credit) {
                newEntry.total = newEntry.credit;
            } else {
                newEntry.total = newEntry.total - newEntry.debit;
            }
            shop.ledger.push(newEntry);
        } else {
            var lastEntry = ledger[ledger.length - 1];
            if (newEntry.credit) {
                newEntry.total = Number(lastEntry.total) + Number(newEntry.credit);
            } else {
                newEntry.total = Number(lastEntry.total) - Number(newEntry.debit);
            }
            shop.ledger.push(newEntry);
        }

        shop.save(function (error) {
            if (error) {
                console.log("Error");
                return res.status(500).json();
            }
            return res.status(204).json({ message: "All Good" });
        });
    });
}