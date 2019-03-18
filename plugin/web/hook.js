const path = require("path");
const glob = require("glob");

// view hook
const viewHooks = glob.sync("*/view_hook/**/*.vue", {
  cwd: "app"
});

const viewHook = {}
for (const key in viewHooks) {
  const name = path.basename(viewHooks[key]).replace(".vue", "");
  if (viewHook[name]) {
    viewHook[name].push(viewHooks[key])
  } else {
    viewHook[name] = [viewHooks[key]]
  }
}

// service hook
const serviceHooks = glob.sync("*/view_hook/hook.js", {
  cwd: "app"
});

const serviceHook = {}
for (const key in serviceHooks) {
  const module = serviceHooks[key].split("/")[0];
  serviceHook[module] = serviceHooks[key]
}

module.exports = function (options) {
  this.addPlugin({
    src: path.resolve(__dirname, 'hook.template.js'),
    fileName: "hook.js",
    options: {
      viewHook,
      serviceHook
    }
  })
}