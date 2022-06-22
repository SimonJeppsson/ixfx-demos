import {
  NumberTracker,
  numberTracker
} from "./chunk-6L3WNCHL.js";
import {
  KeyValue_exports,
  getSorter
} from "./chunk-4ZNRI3HQ.js";
import {
  pointsTracker
} from "./chunk-4PS2Y7LA.js";
import {
  queueMutable
} from "./chunk-XPRO47PR.js";
import {
  Arrays_exports,
  minMaxAvg
} from "./chunk-IKSWBEON.js";
import {
  clamp,
  scale
} from "./chunk-LO2A4AGL.js";
import {
  integer
} from "./chunk-U4IZE4J2.js";
import {
  SimpleEventEmitter
} from "./chunk-764ABC7D.js";
import {
  __export,
  __privateAdd,
  __privateGet,
  __privateSet,
  __publicField
} from "./chunk-6SYKIMQH.js";

// src/temporal/index.ts
var temporal_exports = {};
__export(temporal_exports, {
  FrequencyMutable: () => FrequencyMutable,
  Normalise: () => Normalise_exports,
  frequencyMutable: () => frequencyMutable,
  intervalTracker: () => intervalTracker,
  movingAverage: () => movingAverage,
  movingAverageLight: () => movingAverageLight,
  numberTracker: () => numberTracker,
  pointsTracker: () => pointsTracker
});

// src/temporal/Normalise.ts
var Normalise_exports = {};
__export(Normalise_exports, {
  array: () => array,
  stream: () => stream
});
var stream = (minDefault, maxDefault) => {
  let min = minDefault ?? Number.MAX_SAFE_INTEGER;
  let max = maxDefault ?? Number.MIN_SAFE_INTEGER;
  return (v) => {
    min = Math.min(min, v);
    max = Math.max(max, v);
    return scale(v, min, max);
  };
};
var array = (values, minForced, maxForced) => {
  if (!Array.isArray(values))
    throw new Error(`values param should be an array`);
  const mma = minMaxAvg(values);
  const min = minForced ?? mma.min;
  const max = maxForced ?? mma.max;
  return values.map((v) => clamp(scale(v, min, max)));
};

// src/temporal/FrequencyMutable.ts
var _store, _keyString;
var FrequencyMutable = class extends SimpleEventEmitter {
  constructor(keyString = void 0) {
    super();
    __privateAdd(this, _store, void 0);
    __privateAdd(this, _keyString, void 0);
    __privateSet(this, _store, /* @__PURE__ */ new Map());
    if (keyString === void 0) {
      keyString = (a) => {
        if (a === void 0)
          throw new Error(`Cannot create key for undefined`);
        if (typeof a === `string`) {
          return a;
        } else {
          return JSON.stringify(a);
        }
      };
    }
    __privateSet(this, _keyString, keyString);
  }
  clear() {
    __privateGet(this, _store).clear();
    this.fireEvent(`change`, void 0);
  }
  keys() {
    return __privateGet(this, _store).keys();
  }
  values() {
    return __privateGet(this, _store).values();
  }
  toArray() {
    return Array.from(__privateGet(this, _store).entries());
  }
  debugString() {
    let t = ``;
    for (const [key, count] of __privateGet(this, _store).entries()) {
      t += `${key}: ${count}, `;
    }
    if (t.endsWith(`, `))
      return t.substring(0, t.length - 2);
    return t;
  }
  frequencyOf(value) {
    if (typeof value === `string`)
      return __privateGet(this, _store).get(value);
    const key = __privateGet(this, _keyString).call(this, value);
    return __privateGet(this, _store).get(key);
  }
  relativeFrequencyOf(value) {
    let freq;
    if (typeof value === `string`)
      freq = __privateGet(this, _store).get(value);
    else {
      const key = __privateGet(this, _keyString).call(this, value);
      freq = __privateGet(this, _store).get(key);
    }
    if (freq === void 0)
      return;
    const mma = this.minMaxAvg();
    return freq / mma.total;
  }
  entries() {
    return Array.from(__privateGet(this, _store).entries());
  }
  minMaxAvg() {
    return KeyValue_exports.minMaxAvg(this.entries());
  }
  entriesSorted(sortStyle = `value`) {
    const s = getSorter(sortStyle);
    return s(this.entries());
  }
  add(...values) {
    if (values === void 0)
      throw new Error(`value parameter is undefined`);
    const keys = values.map(__privateGet(this, _keyString));
    keys.forEach((key) => {
      const score = __privateGet(this, _store).get(key) ?? 0;
      __privateGet(this, _store).set(key, score + 1);
    });
    this.fireEvent(`change`, void 0);
  }
};
_store = new WeakMap();
_keyString = new WeakMap();
var frequencyMutable = (keyString) => new FrequencyMutable(keyString);

// src/temporal/MovingAverage.ts
var movingAverageLight = (scaling = 3) => {
  integer(scaling, `aboveZero`, `scaling`);
  let average = 0;
  let count = 0;
  const ma = {
    add(v) {
      count++;
      average = average + (v - average) / Math.min(count, scaling);
      return average;
    },
    clear() {
      average = 0;
      count = 0;
    },
    compute() {
      return average;
    }
  };
  return ma;
};
var movingAverage = (samples = 100, weightingFn) => {
  let q = queueMutable({
    capacity: samples,
    discardPolicy: `older`
  });
  const clear = () => {
    q = queueMutable({
      capacity: samples,
      discardPolicy: `older`
    });
  };
  const compute = () => {
    if (weightingFn === void 0) {
      return Arrays_exports.average(...q.data);
    } else {
      return Arrays_exports.averageWeighted(q.data, weightingFn);
    }
  };
  const add = (v) => {
    q.enqueue(v);
    return compute();
  };
  return { add, compute, clear };
};

// src/temporal/IntervalTracker.ts
var IntervalTracker = class extends NumberTracker {
  constructor() {
    super(...arguments);
    __publicField(this, "lastMark", 0);
  }
  mark() {
    if (this.lastMark > 0) {
      this.seen(window.performance.now() - this.lastMark);
    }
    this.lastMark = window.performance.now();
  }
};
var intervalTracker = (id, opts) => new IntervalTracker(id, opts);

export {
  Normalise_exports,
  FrequencyMutable,
  frequencyMutable,
  movingAverageLight,
  movingAverage,
  intervalTracker,
  temporal_exports
};
//# sourceMappingURL=chunk-TVXIDBKO.js.map