export interface CalcContext {
    width: number;
    height: number;
    viewportWidth: number;
    viewportHeight: number;
    /** font-size on <html> element */
    htmlFontSize: number,
}

// units -> pixels
export const Absolute = {
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

export type AbsoluteUnit = keyof typeof Absolute;

// units ->(calc context)-> pixels
export const Relative = {
    /** Equal to 1% of the height of the viewport */
    'vh': (count: number = 1, ctx?: { viewportHeight: number }) => {
        return (ctx ? ctx.viewportHeight : window.innerHeight) / 100 * count;
    },
    /** Equal to 1% of the width of the viewport */
    'vw': (count: number = 1, ctx?: { viewportWidth: number }) => {
        return (ctx ? ctx.viewportWidth : window.innerWidth) / 100 * count;
    },
    /** 1/100th of the smallest viewport side */
    'vmin': (count: number = 1, ctx?: { viewportWidth: number, viewportHeight: number }) => {
        return (ctx ? Math.min(ctx.viewportWidth, ctx.viewportHeight) : Math.min(window.innerWidth, window.innerHeight)) / 100 * count;
    },
    /** 1/100th of the largest viewport side */
    'vmax': (count: number = 1, ctx?: { viewportWidth: number, viewportHeight: number }) => {
        return (ctx ? Math.max(ctx.viewportWidth, ctx.viewportHeight) : Math.max(window.innerWidth, window.innerHeight)) / 100 * count;
    },
    /** Represents the font-size of <html> element */
    'rem': (count: number = 1, ctx?: { htmlFontSize: number }) => {
        return (ctx ? ctx.htmlFontSize : parseFloat(window.getComputedStyle(document.querySelector('html')!).fontSize!)) * count;
    },
    /** percent of width */
    '%w': (count: number = 1, ctx?: { width: number }) => {
        return (ctx ? ctx.width : document.body.clientWidth) / 100 * count;
    },
    /** percent of height */
    '%h': (count: number = 1, ctx?: { height: number }) => {
        return (ctx ? ctx.height : document.body.clientHeight) / 100 * count;
    },
};

export const Units = {
    ...Relative,
    ...Absolute,
};

export type RelativeUnit = keyof typeof Relative;

export type Unit = AbsoluteUnit | RelativeUnit;

export const UnitRegexpStr = `(?:\\s|^)(\\d*(?:\\.\\d+)?)(${Object.keys(Units).join('|')})(?:\\s|$|\\n)`;
export const UnitRegexp = new RegExp(UnitRegexpStr);
export const UnitRegexpGM = new RegExp(UnitRegexpStr, 'gm');

export function convert(
    count: number,
    fromUnits: Unit,
    toUnits: Unit,
    ctx: CalcContext = calcCtx(),
): number {
    const baseUnit = Units[fromUnits];
    const basePx = (typeof baseUnit === 'function') ? baseUnit(count, ctx) : (baseUnit * count);
    
    const dstUnit = Units[toUnits];
    const dstBasePx = (typeof dstUnit === 'function') ? dstUnit(1, ctx) : dstUnit;

    return basePx / dstBasePx;
}

export function convertAllInStr(
    expr: string,
    toUnits: Unit,
    ctx: CalcContext = calcCtx(),
): string {
    return expr.replace(UnitRegexpGM, (substr, count, unit) => {
        return convert(parseFloat(count), unit, toUnits, ctx).toString();
    });
}

export function calcCtx(el?: HTMLElement): CalcContext {
    if (el) {
        const rect = el.getBoundingClientRect();
    
        return {
            width: rect.width,
            height: rect.height,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            htmlFontSize: parseFloat(window.getComputedStyle(document.querySelector('html')!).fontSize!),
        };
    } else {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            htmlFontSize: parseFloat(window.getComputedStyle(document.querySelector('html')!).fontSize!),
        };
    }
}

export function calc(expression: string, el: HTMLElement, ctx?: CalcContext): number;
export function calc(expression: string, ctx?: CalcContext): number;

export function calc(
    expression: string,
    el_ctx: HTMLElement|CalcContext|undefined,
    ctx?: CalcContext,
): number {
    if (el_ctx === undefined) ctx = calcCtx();
    else {
        if (el_ctx instanceof HTMLElement) {
            if (!ctx) ctx = calcCtx(el_ctx);
        } else {
            ctx = el_ctx;
        }
    }

    return eval(convertAllInStr(expression, 'px', ctx));
}