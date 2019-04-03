"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// units -> pixels
exports.Absolute = {
    /** browser version of pixel */
    'px': 1,
    /** One centimeter. 1cm = 96px/2.54 */
    'cm': 96 / 2.54,
    /** One millimeter. 1mm = 1/10th of 1cm */
    'mm': 96 / 25.4,
    /** One quarter of a millimeter. 1Q = 1/40th of 1cm */
    'Q': 96 / 101.6,
    /** One inch. 1in = 2.54cm = 96px */
    'in': 96,
    /** One pica. 1pc = 12pt = 1/6th of 1in */
    'pc': 96 / 6,
    /** One point. 1pt = 1/72nd of 1in */
    'pt': 96 / 72,
};
// units ->(calc context)-> pixels
exports.Relative = {
    /** Equal to 1% of the height of the viewport */
    'vh': function (count, ctx) {
        if (count === void 0) { count = 1; }
        return (ctx ? ctx.viewportHeight : window.innerHeight) / 100 * count;
    },
    /** Equal to 1% of the width of the viewport */
    'vw': function (count, ctx) {
        if (count === void 0) { count = 1; }
        return (ctx ? ctx.viewportWidth : window.innerWidth) / 100 * count;
    },
    /** 1/100th of the smallest viewport side */
    'vmin': function (count, ctx) {
        if (count === void 0) { count = 1; }
        return (ctx ? Math.min(ctx.viewportWidth, ctx.viewportHeight) : Math.min(window.innerWidth, window.innerHeight)) / 100 * count;
    },
    /** 1/100th of the largest viewport side */
    'vmax': function (count, ctx) {
        if (count === void 0) { count = 1; }
        return (ctx ? Math.max(ctx.viewportWidth, ctx.viewportHeight) : Math.max(window.innerWidth, window.innerHeight)) / 100 * count;
    },
    /** Represents the font-size of <html> element */
    'rem': function (count, ctx) {
        if (count === void 0) { count = 1; }
        return (ctx ? ctx.htmlFontSize : parseFloat(window.getComputedStyle(document.querySelector('html')).fontSize)) * count;
    },
    /** percent of width */
    '%w': function (count, ctx) {
        if (count === void 0) { count = 1; }
        return (ctx ? ctx.width : document.body.clientWidth) / 100 * count;
    },
    /** percent of height */
    '%h': function (count, ctx) {
        if (count === void 0) { count = 1; }
        return (ctx ? ctx.height : document.body.clientHeight) / 100 * count;
    },
};
exports.Units = __assign({}, exports.Relative, exports.Absolute);
exports.UnitRegexpStr = "(?:\\s|^)(\\d+)(" + Object.keys(exports.Units).join('|') + ")(?:\\s|$|\\n)";
exports.UnitRegexp = new RegExp(exports.UnitRegexpStr);
exports.UnitRegexpGM = new RegExp(exports.UnitRegexpStr, 'gm');
function convert(count, fromUnits, toUnits, ctx) {
    if (ctx === void 0) { ctx = calcCtx(); }
    var baseUnit = exports.Units[fromUnits];
    var basePx = (typeof baseUnit === 'function') ? baseUnit(count, ctx) : (baseUnit * count);
    var dstUnit = exports.Units[toUnits];
    var dstBasePx = (typeof dstUnit === 'function') ? dstUnit(1, ctx) : dstUnit;
    return basePx / dstBasePx;
}
exports.convert = convert;
function convertAllInStr(expr, toUnits, ctx) {
    if (ctx === void 0) { ctx = calcCtx(); }
    return expr.replace(exports.UnitRegexpGM, function (substr, count, unit) {
        return convert(parseFloat(count), unit, toUnits, ctx).toString();
    });
}
exports.convertAllInStr = convertAllInStr;
function calcCtx(el) {
    if (el) {
        var rect = el.getBoundingClientRect();
        return {
            width: rect.width,
            height: rect.height,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            htmlFontSize: parseFloat(window.getComputedStyle(document.querySelector('html')).fontSize),
        };
    }
    else {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            htmlFontSize: parseFloat(window.getComputedStyle(document.querySelector('html')).fontSize),
        };
    }
}
exports.calcCtx = calcCtx;
function calc(expression, el_ctx, ctx) {
    if (el_ctx === undefined)
        ctx = calcCtx();
    else {
        if (el_ctx instanceof HTMLElement) {
            if (!ctx)
                ctx = calcCtx(el_ctx);
        }
        else {
            ctx = el_ctx;
        }
    }
    return eval(convertAllInStr(expression, 'px', ctx));
}
exports.calc = calc;
