# JSON Map & Set

A basic utility to stringify and parse specialized Maps and Sets.

## Exports

  * `JSONMap` as `Map` extend, it can contain only serializable instances
  * `JSONSet` as `Set` extend, it can contain only serializable instances
  * `SerializableMap` as `Map` extend, it can contain any JSON friendly value, but **not serializable instances**
  * `SerializableSet` as `Set` extend, it can contain any JSON friendly value, but **not serializable instances**

```js
import {JSONSet, SerializableSet} from '@webreflection/json-map';

const generic1 = new SerializableSet;
generic1.add(1);
generic1.add(2);
generic1.add(3);

const generic2 = new SerializableSet;
generic2.add('a');
generic2.add('b');

const serializable = new JSONSet;
serializable.add(generic1);
serializable.add(generic2);

// will invoke toJSON automatically
const asString = JSON.stringify(serializable);
// '{"json_set":[{"set":[1,2,3]},{"set":["a","b"]}]}'

const asJSONSet = JSONSet.fromJSON(JSON.parse(asString));

//  JSONSet(2) [Set] {
//    SerializableSet(3) [Set] { 1, 2, 3 },
//    SerializableSet(2) [Set] { 'a', 'b' }
//  }
```

### Goal

This module has a very specific use case in mind, and it's best combined with [flatted](https://www.npmjs.com/package/flatted) to be able to parse back and forward recursive maps and sets.
