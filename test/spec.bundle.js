// Import shims and boot
import 'src/shim';
import './shim';
import './boot';

// Prevent Karma from running prematurely.
__karma__.loaded = function () {};

// Then we find all the tests,
// pass `true` for recursive.
const context = require.context('../src', true, /\.spec\.(js|ts)$/);
// And load the modules.
context.keys().map(context);

// Finally, start Karma to run the tests.
__karma__.start();
