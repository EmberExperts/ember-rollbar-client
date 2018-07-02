// from https://github.com/tchak/ember-fetch-adapter/blob/master/addon/-private/merge.js
import { assign } from '@ember/polyfills';

const objectPrototype = Object.getPrototypeOf({});
const hasOwnProperty = objectPrototype.hasOwnProperty;
const toString = objectPrototype.toString;

export default function merge(...objs) {
  return assign(Object.create(null), ...objs);
}

export function mergeWith(fn, ...objs) {
  return objs.reduce(
    (o, obj) =>
      obj
        ? entries(obj).reduce((o, [key, value]) => {
          if (hasOwnProperty.call(o, key)) {
            o[key] = fn(o[key], value);
          } else {
            o[key] = value;
          }
          return o;
        }, o)
        : o,
    Object.create(null)
  );
}

export function deepMerge(...objs) {
  return mergeWith(mergeIf, ...objs);
}

function entries(obj) {
  return Object.keys(obj).map(key => [key, obj[key]]);
}

function mergeIf(v1, v2) {
  if (isObj(v1) && isObj(v2)) {
    return deepMerge(v1, v2);
  }

  return v2;
}

function isObj(x) {
  let prototype;
  return (
    toString.call(x) === '[object Object]' &&
    ((prototype = Object.getPrototypeOf(x)),
      prototype === null || prototype === objectPrototype)
  );
}
