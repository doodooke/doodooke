import Vue from 'vue'
import Hook from "~/hook.vue"

/**
 * view hook
 */
<%
const _viewHooks = {};
const _viewImports = [];

for (const key in options.viewHook) {
  for (const _key in options.viewHook[key]) {
    const _name = '_' + hash('v' + key + _key);
    _viewImports.push(`import ${_name} from '../../../app/${options.viewHook[key][_key]}'`);

    if (_viewHooks[key]) {
      _viewHooks[key].push(_name)
    } else {
      _viewHooks[key] = [_name]
    }
  }
}
%>
<%= _viewImports.join("\n") %>

const components = <%= JSON.stringify(_viewHooks, null, 2).replace(/\"/g, "") %>

/**
 * service hook
 */
<%
const _serviceHooks = {};
const _serviceImports = [];

for (const key in options.serviceHook) {
  const _name = '_' + hash('s' + key);
  const _path = options.serviceHook[key]
  _serviceImports.push(`import ${_name} from '../../../app/${_path}'`);
  _serviceHooks[key] = _name
}
%>
<%= _serviceImports.join("\n") %>

const services = <%= JSON.stringify(_serviceHooks, null, 2).replace(/\"/g, "") %>
const _services = {};
for (const key in services) {
  for (const _key in services[key]) {
    const fn = services[key][_key];
    if (_services[_key]) {
      _services[_key].push(fn);
    } else {
      _services[_key] = [fn];
    }
  }
}

export default (ctx, inject) => {

  for (const key in components) {
    components[key].sort((a, b) => {
      const _a = a.rank || 0;
      const _b = b.rank || 0;
      return _b - _a;
    })
  }

  for (const key in _services) {
    _services[key].sort((a, b) => {
      const _a = a.rank || 0;
      const _b = b.rank || 0;
      return _b - _a;
    })
  }

  const hook = {
    components,

    services: _services,

    get(name) {
      return _services[name] || [];
    },

    async run(name, ...args) {
      const fns = _services[name] || [];
      for (const key in fns) {
        await fns[key](...args);
      }
    }
  }

  ctx.$hook = hook
  inject("hook", hook)
}

Vue.component("doodoo-hook", Hook);