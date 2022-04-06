/**
 * flow/list-async
 * Demonstrates processing a list of things asynchronously, with a defined interval.
 * 
 * It uses a stack to store the processnig queue. This means that the most recently added
 * will be processed before older items. Use a Queue if you want the opposite.
 */
import {continuously} from "../../ixfx/flow.js"
import {Stacks} from "../../ixfx/collections.js"
import {log} from '../../ixfx/dom.js';

const settings = {
  processIntervalMs: 1000,
  log: log(`#log`, {
    capacity: 10,
    timestamp: true
  })
}

let state = {
  // Eg: limit stack to 10 items
  toProcess: Stacks.stack({capacity: 10})
}

const processor = continuously(() => {
  // Keeps looping until we've done everything in backlog
  const {log} = settings;
  let {toProcess} = state;
  if (toProcess.isEmpty) return false; // Stack is empty

  // Get top-most item
  const item = toProcess.peek;

  // Put stack without item back into state
  state = {
    ...state,
    toProcess: toProcess.pop()
  }

  // Do something with item (in this case, print a log message)
  log.log(`🤖 Processing ${item}`);
  return true; // Keep loop running
}, settings.processIntervalMs);

// Adds item to stack
const process = (item) => {
  const {toProcess} = state;
  state = {
    ...state,
    toProcess: toProcess.push(item)
  };

  // Start if it's not already running
  processor.start();
}

const setup = () => {
  // Adds three items to backlog
  document.getElementById(`btnAddItems`).addEventListener(`click`, () => {
    const n = performance.now(); // Get a timestamp
    process(`${n} - 1`);    // Add a string, but it could be an object
    process(`${n} - 2`);
    process(`${n} - 3`);
  });
}
setup();
