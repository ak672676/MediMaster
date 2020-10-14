"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = index;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.show = show;

var _userModel = require("../../model/user-model");

var _userModel2 = _interopRequireDefault(_userModel);

var _medicineModel = require("../../model/medicine-model");

var _medicineModel2 = _interopRequireDefault(_medicineModel);

var _authService = require("../../services/auth-service");

var auth = _interopRequireWildcard(_authService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
    _medicineModel2.default.find({}, function (error, medicines) {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ medicines: medicines });
    });
}

function create(req, res) {
    var id = auth.getUserId(req);
    _userModel2.default.findOne({ _id: id }, function (error, user) {
        if (error && !user) {
            return res.status(500).json();
        }

        var medicine = new _medicineModel2.default(req.body.medicine);
        medicine.save(function (error) {
            if (error) {
                return res.status(500).json();
            }
            return res.status(204).json();
        });
    });
}

function update(req, res) {
    var id = auth.getUserId(req);

    _userModel2.default.findOne({ _id: id }, function (error, user) {
        if (error) {
            return res.status(500).json();
        }
        if (!user) {
            return res.status(404).json();
        }
        var medicine = new _medicineModel2.default(req.body.medicine);
        _medicineModel2.default.findByIdAndUpdate({ _id: medicine._id }, medicine, function (error) {
            console.log(error);
            if (error) {
                return res.status(500).json();
            }
            console.log("bbbbbbbb");

            return res.status(204).json({ message: medicine });
        });
    });
}

function remove(req, res) {
    var id = auth.getUserId(req);
    console.log("from delete---> ", id);
    _userModel2.default.findOne({ _id: id }, function (error, user) {
        if (error) {
            return res.status(500).json();
        }
        if (!user) {
            return res.status(404).json();
        }

        if (!user.isAdmin) {
            return res.status(403).json({ message: "You are not allowed to delete a medicine" });
        }
        _medicineModel2.default.deleteOne({ _id: req.params.id }, function (error) {
            if (error) {
                return res.status(500).json();
            }
            return res.status(204).json();
        });
    });
}

function show(req, res) {
    _medicineModel2.default.findOne({ _id: req.params.id }, function (error, medicine) {
        if (error) {
            return res.status(500).json();
        }
        if (!medicine) {
            return res.status(404).json();
        }
        return res.status(200).json({ medicine: medicine });
    });
}