const {JSONMap, JSONSet, SerializableMap, SerializableSet} = require('../cjs');

const map = new SerializableMap;
const set = new SerializableSet;
const jsonMap = new JSONMap;
const jsonSet = new JSONSet;
const innerMap = new JSONMap;
const innerSet = new JSONSet;

map.set('key', 'value');
set.add('key');

jsonMap.set('map', map);
jsonMap.set('set', set);
jsonMap.set('json-map', innerMap);
jsonMap.set('json-set', innerSet);

jsonSet.add(map);
jsonSet.add(set);
jsonSet.add(innerMap);
jsonSet.add(innerSet);

const transformedMap = JSONMap.fromJSON(JSON.parse(JSON.stringify(jsonMap)));
console.assert(transformedMap instanceof JSONMap);
console.assert(transformedMap.get('map') instanceof SerializableMap);
console.assert(transformedMap.get('set') instanceof SerializableSet);
console.assert(transformedMap.get('json-map') instanceof JSONMap);
console.assert(transformedMap.get('json-set') instanceof JSONSet);

const transformedSet = JSONSet.fromJSON(JSON.parse(JSON.stringify(jsonSet)));
console.assert(transformedSet instanceof JSONSet);

const values = [...transformedSet];
console.assert(values[0] instanceof SerializableMap);
console.assert(values[1] instanceof SerializableSet);
console.assert(values[2] instanceof JSONMap);
console.assert(values[3] instanceof JSONSet);
