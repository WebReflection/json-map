const {keys} = Object;

export class JSONMap extends Map {
  static fromJSON({json_map}) {
    const self = new this;
    for (const [key, value] of json_map) {
      switch (keys(value).shift()) {
        case 'map':
          self.set(key, SerializableMap.fromJSON(value));
          break;
        case 'set':
          self.set(key, SerializableSet.fromJSON(value));
          break;
        case 'json_map':
          self.set(key, JSONMap.fromJSON(value));
          break;
        case 'json_set':
          self.set(key, JSONSet.fromJSON(value));
          break;
      }
    }
    return self;
  }
  toJSON() {
    return {json_map: [...this.entries()]};
  }
}

export class JSONSet extends Set {
  static fromJSON({json_set}) {
    const self = new this;
    for (const value of json_set) {
      switch (keys(value).shift()) {
        case 'map':
          self.add(SerializableMap.fromJSON(value));
          break;
        case 'set':
          self.add(SerializableSet.fromJSON(value));
          break;
        case 'json_map':
          self.add(JSONMap.fromJSON(value));
          break;
        case 'json_set':
          self.add(JSONSet.fromJSON(value));
          break;
      }
    }
    return self;
  }
  toJSON() {
    return {json_set: [...this.values()]};
  }
}

export class SerializableMap extends Map {
  static fromJSON({map}) {
    return new this(map);
  }
  toJSON() {
    return {map: [...this.entries()]};
  }
}

export class SerializableSet extends Set {
  static fromJSON({set}) {
    return new this(set);
  }
  toJSON() {
    return {set: [...this.values()]};
  }
}
