import * as lit_html from 'lit-html';
import * as lit from 'lit';
import { LitElement } from 'lit';
import { a as KeyValue } from './KeyValue-3e329cb3.js';
import './NumericArrays-7f5fa481.js';
import './Easing-22417695.js';
import './index-0f9db2f2.js';
import './StateMachine-d120065d.js';
import './Events-170d1411.js';
import './Delay-68bd0948.js';
import './Eq';
import './Ordering';

declare type Bar = {
    readonly percentage: number;
    readonly data: KeyValue;
};
/**
 * Usage in HTML:
 * ```html
 * <style>
 * histogram-vis {
 *  display: block;
 *  height: 7em;
 *  --histogram-bar-color: pink;
 * }
 * </style>
 * <histogram-vis>
 * [
 *  ["apples", 5],
 *  ["oranges", 3],
 *  ["pineapple", 0],
 *  ["limes", 9]
 * ]
 * </histogram-vis>
 * ```
 *
 * CSS colour theming:
 * --histogram-bar-color
 * --histogram-label-color
 *
 * HTML tag attributes
 * showXAxis (boolean)
 * showDataLabels (boolean)
 *
 * @export
 * @class HistogramVis
 * @extends {LitElement}
 **/
declare class HistogramVis extends LitElement {
    static readonly styles: lit.CSSResult;
    data: readonly KeyValue[];
    showDataLabels: boolean;
    height: string;
    showXAxis: boolean;
    json: readonly KeyValue[] | undefined;
    constructor();
    connectedCallback(): void;
    barTemplate(bar: Bar, index: number, _totalBars: number): lit_html.TemplateResult<1>;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        readonly "histogram-vis": HistogramVis;
    }
}

/**
 * Creates and drives a HistogramVis instance.
 * Data should be an outer array containing two-element arrays for each
 * data point. The first element of the inner array is expected to be the key, the second the frequency.
 * For example,  `[`apples`, 2]` means the key `apples` was counted twice.
 *
 * Usage:
 * .sortBy() automatically sorts prior to visualisation. By default off.
 * .update(data) full set of data to plot
 * .clear() empties plot - same as calling `update([])`
 * .el - The `HistogramVis` instance, or undefined if not created/disposed
 *
 * ```
 * const plot = new FrequencyHistogramPlot(document.getElementById('histogram'));
 * plot.sortBy('key'); // Automatically sort by key
 * ...
 * plot.update([[`apples`, 2], [`oranges', 0], [`bananas`, 5]])
 * ```
 *
 * @export
 * @class FrequencyHistogramPlot
 */
declare class FrequencyHistogramPlot {
    #private;
    readonly el: HistogramVis | undefined;
    constructor(el: HistogramVis);
    setAutoSort(sortStyle: `value` | `valueReverse` | `key` | `keyReverse`): void;
    clear(): void;
    dispose(): void;
    update(data: ReadonlyArray<readonly [key: string, count: number]>): void;
}

export { FrequencyHistogramPlot, HistogramVis };
