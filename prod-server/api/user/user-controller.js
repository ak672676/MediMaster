"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = index;
function index(req, res) {
    console.log("user Backend");
    return res.json({ message: 'Helloss World' });
}