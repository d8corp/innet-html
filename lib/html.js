'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@innet/utils');
var innet = require('innet');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

var selfClosed = {
    area: true,
    base: true,
    br: true,
    col: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    link: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true,
};
function deepJoin(target, separator) {
    if (separator === void 0) { separator = ''; }
    if (Array.isArray(target)) {
        return target.map(function (e) { return deepJoin(e); }).join(separator);
    }
    return target;
}
function htmlPlugin() {
    return function (app, next, handler) {
        if (app && typeof app.type === 'string') {
            var type = app.type, props_1 = app.props, children = app.children;
            var propsString = props_1 ? ' ' + Object.keys(props_1).map(function (key) { return "".concat(key, "=\"").concat(props_1[key], "\""); }).join(' ') : '';
            var start = "<".concat(type).concat(propsString, ">");
            if (selfClosed[type]) {
                return start;
            }
            else {
                return deepJoin([start, innet__default["default"](children, handler), "</".concat(type, ">")]);
            }
        }
        return next();
    };
}
function html(app, handler) {
    var childrenHandler = innet.createHandler([
        utils.object([
            htmlPlugin,
        ]),
    ], handler);
    childrenHandler[app.type] = undefined;
    return innet__default["default"](app, childrenHandler);
}

exports["default"] = html;
exports.htmlPlugin = htmlPlugin;
exports.selfClosed = selfClosed;
