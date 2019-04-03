export interface CalcContext {
    width: number;
    height: number;
    viewportWidth: number;
    viewportHeight: number;
    /** font-size on <html> element */
    htmlFontSize: number;
}
export declare const Absolute: {
    /** browser version of pixel */
    'px': number;
    /** One centimeter. 1cm = 96px/2.54 */
    'cm': number;
    /** One millimeter. 1mm = 1/10th of 1cm */
    'mm': number;
    /** One quarter of a millimeter. 1Q = 1/40th of 1cm */
    'Q': number;
    /** One inch. 1in = 2.54cm = 96px */
    'in': number;
    /** One pica. 1pc = 12pt = 1/6th of 1in */
    'pc': number;
    /** One point. 1pt = 1/72nd of 1in */
    'pt': number;
};
export declare type AbsoluteUnit = keyof typeof Absolute;
export declare const Relative: {
    /** Equal to 1% of the height of the viewport */
    'vh': (count?: number, ctx?: {
        viewportHeight: number;
    } | undefined) => number;
    /** Equal to 1% of the width of the viewport */
    'vw': (count?: number, ctx?: {
        viewportWidth: number;
    } | undefined) => number;
    /** 1/100th of the smallest viewport side */
    'vmin': (count?: number, ctx?: {
        viewportWidth: number;
        viewportHeight: number;
    } | undefined) => number;
    /** 1/100th of the largest viewport side */
    'vmax': (count?: number, ctx?: {
        viewportWidth: number;
        viewportHeight: number;
    } | undefined) => number;
    /** Represents the font-size of <html> element */
    'rem': (count?: number, ctx?: {
        htmlFontSize: number;
    } | undefined) => number;
    /** percent of width */
    '%w': (count?: number, ctx?: {
        width: number;
    } | undefined) => number;
    /** percent of height */
    '%h': (count?: number, ctx?: {
        height: number;
    } | undefined) => number;
};
export declare const Units: {
    /** browser version of pixel */
    'px': number;
    /** One centimeter. 1cm = 96px/2.54 */
    'cm': number;
    /** One millimeter. 1mm = 1/10th of 1cm */
    'mm': number;
    /** One quarter of a millimeter. 1Q = 1/40th of 1cm */
    'Q': number;
    /** One inch. 1in = 2.54cm = 96px */
    'in': number;
    /** One pica. 1pc = 12pt = 1/6th of 1in */
    'pc': number;
    /** One point. 1pt = 1/72nd of 1in */
    'pt': number;
    /** Equal to 1% of the height of the viewport */
    'vh': (count?: number, ctx?: {
        viewportHeight: number;
    } | undefined) => number;
    /** Equal to 1% of the width of the viewport */
    'vw': (count?: number, ctx?: {
        viewportWidth: number;
    } | undefined) => number;
    /** 1/100th of the smallest viewport side */
    'vmin': (count?: number, ctx?: {
        viewportWidth: number;
        viewportHeight: number;
    } | undefined) => number;
    /** 1/100th of the largest viewport side */
    'vmax': (count?: number, ctx?: {
        viewportWidth: number;
        viewportHeight: number;
    } | undefined) => number;
    /** Represents the font-size of <html> element */
    'rem': (count?: number, ctx?: {
        htmlFontSize: number;
    } | undefined) => number;
    /** percent of width */
    '%w': (count?: number, ctx?: {
        width: number;
    } | undefined) => number;
    /** percent of height */
    '%h': (count?: number, ctx?: {
        height: number;
    } | undefined) => number;
};
export declare type RelativeUnit = keyof typeof Relative;
export declare type Unit = AbsoluteUnit | RelativeUnit;
export declare const UnitRegexpStr: string;
export declare const UnitRegexp: RegExp;
export declare const UnitRegexpGM: RegExp;
export declare function convert(count: number, fromUnits: Unit, toUnits: Unit, ctx?: CalcContext): number;
export declare function convertAllInStr(expr: string, toUnits: Unit, ctx?: CalcContext): string;
export declare function calcCtx(el?: HTMLElement): CalcContext;
export declare function calc(expression: string, el: HTMLElement, ctx?: CalcContext): number;
export declare function calc(expression: string, ctx?: CalcContext): number;
