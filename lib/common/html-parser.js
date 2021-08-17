"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseActions = void 0;
var cheerio_1 = __importDefault(require("cheerio"));
function parseActions(html) {
    var $ = cheerio_1.default.load(html);
    var actions = [];
    $('li').each(function (i, el) {
        actions.push($(el).contents().text());
    });
    return actions;
}
exports.parseActions = parseActions;
