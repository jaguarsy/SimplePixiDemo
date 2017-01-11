(function () {
'use strict';

var mapData = [{
  name: 'tree',
  h: 10,
  v: 10
}, {
  name: 'tree',
  h: 12,
  v: 15
}, {
  name: 'tree',
  h: 14,
  v: 14
}, {
  name: 'tree',
  h: 16,
  v: 16
}, {
  name: 'tree',
  h: 20,
  v: 16
}, {
  name: 'tree',
  h: 31,
  v: 23
}, {
  name: 'tree',
  h: 27,
  v: 16
}, {
  name: 'tree',
  h: 16,
  v: 28
}, {
  name: 'people',
  h: 20,
  v: 28
}, {
  name: 'people',
  h: 20,
  v: 18
}];

/*

 Queue.js

 A function to represent a queue

 Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
 the terms of the CC0 1.0 Universal legal code:

 http://creativecommons.org/publicdomain/zero/1.0/legalcode

 */

/* Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 */
function Queue() {

  // initialise the queue and offset
  var queue = [];
  var offset = 0;

  // Returns the length of the queue.
  this.getLength = function () {
    return queue.length - offset;
  };

  // Returns true if the queue is empty, and false otherwise.
  this.isEmpty = function () {
    return queue.length == 0;
  };

  /* Enqueues the specified item. The parameter is:
   *
   * item - the item to enqueue
   */
  this.enqueue = function (item) {
    queue.push(item);
  };

  /* Dequeues an item and returns it. If the queue is empty, the value
   * 'undefined' is returned.
   */
  this.dequeue = function () {

    // if the queue is empty, return immediately
    if (queue.length == 0) return undefined;

    // store the item at the front of the queue
    var item = queue[offset];

    // increment the offset and remove the free space if necessary
    if (++offset * 2 >= queue.length) {
      queue = queue.slice(offset);
      offset = 0;
    }

    // return the dequeued item
    return item;
  };

  /* Returns the item at the front of the queue (without dequeuing it). If the
   * queue is empty then undefined is returned.
   */
  this.peek = function () {
    return queue.length > 0 ? queue[offset] : undefined;
  };

  this.last = function () {
    return queue[length - 1];
  };

  this.clear = function () {
    offset = 0;
    queue = [];
  };

  this.getQueue = function () {
    return queue.slice(offset);
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var Base = function () {
  function Base() {
    classCallCheck(this, Base);

    this.tasks = new Queue();
  }

  createClass(Base, [{
    key: 'getRect',
    value: function getRect() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.pxObj.position;

      return {
        x: position.x,
        y: position.y,
        width: this.pxObj.width,
        height: this.pxObj.height
      };
    }
  }, {
    key: 'getSelectRect',
    value: function getSelectRect() {
      return {
        x: this.pxObj.position.x,
        y: this.pxObj.position.y,
        width: this.pxObj.width + 1,
        height: this.pxObj.height + 1
      };
    }
  }, {
    key: 'bindToContainer',
    value: function bindToContainer(camera) {
      this.pxObj.setParent(camera);
    }
  }]);
  return Base;
}();

var Graphics = function (_Base) {
  inherits(Graphics, _Base);

  function Graphics() {
    classCallCheck(this, Graphics);

    var _this = possibleConstructorReturn(this, (Graphics.__proto__ || Object.getPrototypeOf(Graphics)).call(this));

    _this.pxObj = new PIXI.Graphics();
    return _this;
  }

  createClass(Graphics, [{
    key: 'clear',
    value: function clear() {
      this.pxObj.clear();
    }
  }, {
    key: 'drawRect',
    value: function drawRect(x, y, width, height, color) {
      this.pxObj.lineStyle(1, color);
      return this.pxObj.drawRect(x, y, width, height);
    }
  }]);
  return Graphics;
}(Base);

var graphics = new Graphics();

var config = {
  selectRectColor: 0x60de68,
  mapHSize: 60,
  mapVSize: 35,
  unitSize: 30,
  halfUnitSize: 15,
  fontStyle: {
    fontFamily: 'Arial',
    fontSize: '12px',
    fontWeight: 'normal',
    fill: '#000000',
    align: 'center'
  }
};

var selectedMap = {};

var selectedUnits = {
  add: function add(unit) {
    selectedMap[unit.uuid] = unit;
  },
  remove: function remove(unit) {
    if (typeof unit === 'string') {
      selectedMap[unit].clearSelectedGraph();
      delete selectedMap[unit];
    } else {
      unit.clearSelectedGraph();
      delete selectedMap[unit.uuid];
    }
  },
  addOrRemove: function addOrRemove(unit) {
    if (selectedMap[unit.uuid]) {
      this.remove(unit.uuid);
    } else {
      selectedMap[unit.uuid] = unit;
    }
  },
  removeAll: function removeAll() {
    var _this = this;

    Object.keys(selectedMap).forEach(function (key) {
      _this.remove(key);
    });
  },
  contains: function contains(uuid) {
    return !!selectedMap[uuid];
  },
  each: function each(func) {
    Object.keys(selectedMap).forEach(function (key) {
      var unit = selectedMap[key];
      func(unit);
    });
  },
  broadcast: function broadcast(command, params) {
    this.each(function (unit) {
      unit[command].apply(unit, params);
    });
  },
  renderSelectedRect: function renderSelectedRect() {
    graphics.clear();

    this.each(function (unit) {
      var selectRect = unit.getSelectRect();
      graphics.drawRect(selectRect.x, selectRect.y, selectRect.width, selectRect.height, config.selectRectColor);

      unit.drawMovingPath();
    });
  }
};

var s4 = function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};

var guid = (function () {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
});

var vector = {
  add: function add(v1, v2) {
    if (!v1 || !v2) {
      return {};
    }

    var result = {};
    Object.keys(v1).forEach(function (key) {
      return result[key] = v1[key] + v2[key];
    });
    return result;
  },

  minus: function minus(v1, v2) {
    if (!v1 || !v2) {
      return {};
    }

    var result = {};
    Object.keys(v1).forEach(function (key) {
      return result[key] = v1[key] - v2[key];
    });
    return result;
  },

  equal: function equal(v1, v2) {
    if (!v1 || !v2) {
      return false;
    }

    return Object.keys(v1).every(function (key) {
      return v1[key] === v2[key];
    });
  },

  getCross: function getCross(p1, p2, p) {
    return (p2.x - p1.x) * (p.y - p1.y) - (p.x - p1.x) * (p2.y - p1.y);
  }
};

var initArray = (function (hCount, vCount) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var arr = [];
  for (var i = 0; i < hCount; i++) {
    var row = [];
    for (var j = 0; j < vCount; j++) {
      row.push(value);
    }
    arr.push(row);
  }
  return arr;
});

var rectCollisionDetect = (function (r1, r2) {
  //Define the variables we'll need to calculate
  var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
});

var positionToTile = (function (position) {
  var camera = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { position: { x: 0, y: 0 } };

  var tile = {};
  tile.h = Math.floor((position.x - camera.position.x) / config.unitSize);
  tile.v = Math.floor((position.y - camera.position.y) / config.unitSize);
  return tile;
});

var tileToPosition = (function (tile) {
  var position = {};
  position.x = Math.round(tile.h * config.unitSize);
  position.y = Math.round(tile.v * config.unitSize);
  return position;
});

var tileToCenter = (function (tile) {
  var position = {};
  position.x = Math.round(tile.h * config.unitSize) + config.halfUnitSize;
  position.y = Math.round(tile.v * config.unitSize) + config.halfUnitSize;
  return position;
});

var positionEqualTile = (function (position, targetTile) {
  var camera = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { position: { x: 0, y: 0 } };

  var tile = {
    h: (position.x - camera.position.x) * 100 / config.unitSize / 100,
    v: (position.y - camera.position.y) * 100 / config.unitSize / 100
  };
  return vector.equal(tile, targetTile);
});

var UnitBase = function (_Base) {
  inherits(UnitBase, _Base);

  function UnitBase(camera, mapItem) {
    classCallCheck(this, UnitBase);

    var _this = possibleConstructorReturn(this, (UnitBase.__proto__ || Object.getPrototypeOf(UnitBase)).call(this));

    _this.camera = camera;

    // 是否有碰撞体积，默认均为是
    _this.collision = true;

    _this.breakable = false;

    _this.uuid = guid();
    _this.pxObj = new PIXI.Sprite(PIXI.loader.resources[mapItem.name].texture);
    _this.pxObj.position.set(mapItem.h * config.unitSize, mapItem.v * config.unitSize);
    _this.tile = { h: mapItem.h, v: mapItem.v };

    camera.addChild(_this.pxObj);

    _this.pxObj.interactive = true;
    _this.pxObj.on('click', _this.selectHandler.bind(_this));

    _this.pen = new PIXI.Graphics();
    _this.pen.setParent(camera);

    _this.title = new PIXI.Text('', config.fontStyle);
    _this.title.setParent(_this.pxObj);
    _this.title.y = -20;
    return _this;
  }

  createClass(UnitBase, [{
    key: 'setNickName',
    value: function setNickName(nickName) {
      this.nickName = nickName;
      this.refreshTitle();
    }
  }, {
    key: 'refreshTitle',
    value: function refreshTitle() {
      this.title.setText((this.nickName || this.name) + ' - ' + this.state.hp);
    }
  }, {
    key: 'addHP',
    value: function addHP(value) {
      if (this.state && this.state.hp) {
        this.state.hp += value;
      }
      this.refreshTitle();
    }
  }, {
    key: 'setPositionByTile',
    value: function setPositionByTile(tile) {
      this.tile.h = tile.h;
      this.tile.v = tile.v;
      var position = tileToPosition(tile);
      this.pxObj.position.set(position.x, position.y);
    }
  }, {
    key: 'getCenter',
    value: function getCenter() {
      return {
        x: this.pxObj.position.x + config.halfUnitSize,
        y: this.pxObj.position.y + config.halfUnitSize
      };
    }
  }, {
    key: 'selectHandler',
    value: function selectHandler(event) {
      if (this.selectable) {
        if (!event.data.originalEvent.shiftKey) {
          selectedUnits.removeAll();
        }

        selectedUnits.addOrRemove(this);
      }
    }
  }, {
    key: 'executeTask',
    value: function executeTask() {
      if (!this.tasks.isEmpty()) {
        var task = this.tasks.peek();
        task.running = true;
        this[task.command].apply(this, task.args);
      }

      if (this.executeCustomTask) {
        this.executeCustomTask();
      }
    }
  }, {
    key: 'drawMovingPath',
    value: function drawMovingPath() {
      this.pen.clear();
      this.pen.lineStyle(1, 0x9acfff);

      var list = this.tasks.getQueue();

      for (var i = 0, len = list.length; i < len - 1; i++) {
        var task = list[i];
        var point = tileToCenter(task.args[0]);
        if (task.running) {
          var center = this.getCenter();
          this.pen.moveTo(center.x, center.y);
          this.pen.lineTo(point.x, point.y);
        }

        var nextPoint = tileToCenter(list[i + 1].args[0]);
        this.pen.moveTo(point.x, point.y);
        if (nextPoint) {
          this.pen.lineTo(nextPoint.x, nextPoint.y);
        }
      }
    }
  }, {
    key: 'clearSelectedGraph',
    value: function clearSelectedGraph() {
      this.pen.clear();
    }
  }, {
    key: 'moveTo',
    value: function moveTo(targetTile) {
      var _this2 = this;

      var interrupt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var currentTile = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.tile;

      var allUnits = map.getAllUnits();
      var mapGraph = initArray(config.mapHSize, config.mapVSize, 1);

      allUnits.forEach(function (item) {
        if (item.collision) {
          mapGraph[item.tile.h][item.tile.v] = 0;
        }
      });

      if (interrupt) {
        var lastTask = this.tasks.dequeue();
        this.tasks.clear();
        if (lastTask && lastTask.running) {
          this.tasks.enqueue(lastTask);
          currentTile = lastTask.args[0];
        }
      }

      var graph = new Graph(mapGraph);
      var start = graph.grid[currentTile.h][currentTile.v];
      var end = graph.grid[targetTile.h][targetTile.v];
      var result = astar.search(graph, start, end);

      result.forEach(function (pathItem) {
        _this2.tasks.enqueue({
          command: 'moveToTile',
          args: [{ h: pathItem.x, v: pathItem.y }]
        });
      });
    }
  }, {
    key: 'getNearestFreeTile',
    value: function getNearestFreeTile(velocity, units) {
      var _this3 = this;

      var newVelocity = { h: velocity.v, v: velocity.h };
      var vList = [newVelocity, velocity];
      var step = 0;
      var tile = vector.add({ h: this.tile.h, v: this.tile.v }, vList[step]);

      while (units.some(function (unit) {
        return unit !== _this3 && vector.equal(unit.tile, tile) && unit.collision;
      })) {
        step = 1 - step;
        tile = vector.add(tile, vList[step]);
      }

      return tile;
    }

    // task method

  }, {
    key: 'moveToTile',
    value: function moveToTile(targetTile) {
      var _this4 = this;

      var velocity = vector.minus(targetTile, this.tile);
      var targetPosition = tileToPosition(targetTile);
      var velocityH = this.props.speed * velocity.h;
      var velocityV = this.props.speed * velocity.v;

      var nextPosition = {
        x: this.pxObj.position.x + velocityH,
        y: this.pxObj.position.y + velocityV
      };
      var nextTile = positionToTile(nextPosition);
      var nearbyUnits = map.getNearbyUnitsByPosition(nextPosition);

      // 运动中进行简单的碰撞检测
      if (nearbyUnits.some(function (unit) {
        return unit !== _this4 && vector.equal(unit.tile, nextTile) && unit.collision;
      })) {
        var task = this.tasks.dequeue();
        var prevTask = void 0;

        while (task && task.command === 'moveToTile') {
          prevTask = task;
          task = this.tasks.dequeue();
        }

        this.tasks.clear();

        var freeTile = this.getNearestFreeTile(velocity, nearbyUnits);
        this.setPositionByTile(freeTile);
        this.moveTo(freeTile);
        this.moveTo(prevTask.args[0], false, freeTile);
      } else {
        if (Math.abs(targetPosition.x - this.pxObj.position.x) < velocityH || Math.abs(targetPosition.y - this.pxObj.position.y) < velocityV) {
          this.pxObj.position.set(targetPosition.x, targetPosition.y);
          this.tile = targetTile;
        } else {
          this.pxObj.position.x += velocityH;
          this.pxObj.position.y += velocityV;
        }

        if (positionEqualTile(this.pxObj.position, targetTile)) {
          this.tile = targetTile;
          this.tasks.dequeue();
        }
      }
    }
  }]);
  return UnitBase;
}(Base);

var calDistance = (function (start, end) {
  return Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
});

var Bullet = function (_Base) {
  inherits(Bullet, _Base);

  function Bullet(camera) {
    classCallCheck(this, Bullet);

    var _this = possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, camera));

    _this.camera = camera;
    _this.pxObj = new PIXI.Sprite(PIXI.loader.resources['bullet'].texture);

    _this.pxObj.visible = false;
    _this.pxObj.setParent(camera);

    _this.props = {
      speed: 5,
      maxDistance: 500,
      damageValue: -10
    };

    _this.explosionTexture = [];
    for (var i = 0; i < 3; i++) {
      _this.explosionTexture.push(PIXI.loader.resources['explosion-' + i].texture);
    }
    _this.explosionAnimate = new PIXI.extras.AnimatedSprite(_this.explosionTexture);

    _this.active = false;
    return _this;
  }

  createClass(Bullet, [{
    key: 'fire',
    value: function fire(position, target) {
      this.active = true;
      this.pxObj.visible = true;
      this.pxObj.position.set(position.x, position.y);

      var deltaX = target.x - position.x;
      var deltaY = target.y - position.y;
      var hypot = Math.hypot(deltaX, deltaY);
      // 计算速度分量
      var velocity = {
        h: this.props.speed * deltaX / hypot,
        v: this.props.speed * deltaY / hypot
      };

      this.tasks.enqueue({
        command: 'keepMove',
        args: [position, velocity]
      });
    }
  }, {
    key: 'keepMove',
    value: function keepMove(start, velocity) {
      var _this2 = this;

      this.pxObj.position.x += velocity.h;
      this.pxObj.position.y += velocity.v;

      if (calDistance(start, this.pxObj.position) >= this.props.maxDistance) {
        this.clear();
        this.tasks.dequeue();
      } else {
        var nearbyUnits = map.getNearbyUnitsByPosition(this.pxObj.position, 60);
        var hitUnit = nearbyUnits.find(function (unit) {
          return unit.breakable && rectCollisionDetect(unit.getRect(), _this2.getRect());
        });
        if (hitUnit && hitUnit.uuid !== this.parent.uuid) {
          hitUnit.addHP(this.props.damageValue);
          this.clear();
          this.tasks.dequeue();
        }
      }
    }
  }, {
    key: 'explode',
    value: function explode() {
      this.explosionAnimate.position.set(this.pxObj.position.x, this.pxObj.position.y);

      this.explosionAnimate.animationSpeed = 0.5;
      this.explosionAnimate.play();
      this.explosionAnimate.setParent(this.camera);
    }
  }, {
    key: 'clear',
    value: function clear() {
      //    this.tasks.enqueue({
      //      command: 'explode',
      //      args: [],
      //    });

      this.active = false;
      this.pxObj.visible = false;
    }
  }]);
  return Bullet;
}(Base);

var People = function (_UnitBase) {
  inherits(People, _UnitBase);

  function People(camera, item) {
    classCallCheck(this, People);

    var _this = possibleConstructorReturn(this, (People.__proto__ || Object.getPrototypeOf(People)).call(this, camera, item));

    _this.name = 'people';
    // 是否可以选中
    _this.selectable = true;
    // 无碰撞体积
    _this.collision = false;
    // 可以被破坏
    _this.breakable = true;
    _this.pxObj.buttonMode = true;

    _this.props = {
      speed: 2,
      bulletLimit: 3
    };

    _this.state = {
      hp: 100
    };

    _this.skills = {};

    _this.bullets = [];

    for (var i = 0; i < _this.props.bulletLimit; i++) {
      var bullet = new Bullet(camera);
      bullet.parent = _this;
      _this.bullets.push(bullet);
    }

    _this.refreshTitle();
    return _this;
  }

  createClass(People, [{
    key: 'executeCustomTask',
    value: function executeCustomTask() {
      this.bullets.forEach(function (bullet) {
        if (!bullet.tasks.isEmpty()) {
          var task = bullet.tasks.peek();
          task.running = true;
          bullet[task.command].apply(bullet, task.args);
        }
      });
    }
  }, {
    key: 'fire',
    value: function fire(targetPosition) {
      var target = {
        x: targetPosition.x - this.camera.position.x,
        y: targetPosition.y - this.camera.position.y
      };
      var freeBullet = this.bullets.find(function (item) {
        return !item.active;
      });

      if (freeBullet) {
        freeBullet.fire(this.getCenter(), target);
      }
    }
  }]);
  return People;
}(UnitBase);

var Tree = function (_UnitBase) {
  inherits(Tree, _UnitBase);

  function Tree(camera, item) {
    classCallCheck(this, Tree);

    var _this = possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, camera, item));

    _this.name = 'tree';
    _this.selectable = false;
    return _this;
  }

  return Tree;
}(UnitBase);

var rand = (function (min, max) {
  return min + Math.round(Math.random() * (max - min));
});

var unitMap = {
  people: People,
  tree: Tree
};

var detectAreaSize = config.unitSize * 10;

var unitCache = [];

var getRandomTile = function getRandomTile() {
  return {
    h: rand(0, config.mapHSize),
    v: rand(0, config.mapVSize)
  };
};

var getRandomFreeTile = function getRandomFreeTile() {
  var resultTile = getRandomTile();
  while (unitCache.some(function (unit) {
    return vector.equal(unit.tile, resultTile);
  })) {
    resultTile = getRandomTile();
  }
  return resultTile;
};

var map = {
  width: config.mapHSize * config.unitSize,
  height: config.mapVSize * config.unitSize,

  loadData: function loadData() {
    return mapData;
  },
  loadMap: function loadMap(camera) {
    var background = new PIXI.extras.TilingSprite(PIXI.loader.resources.bg.texture, this.width, this.height);
    camera.addChild(background);
    graphics.bindToContainer(camera);

    this.loadData().forEach(function (item) {
      var unitClass = unitMap[item.name];
      if (unitClass) {
        var unit = new unitClass(camera, item);
        unitCache.push(unit);
      }
    });
  },
  addUnit: function addUnit(camera, type) {
    var item = getRandomFreeTile();

    item.name = type;
    var unitClass = unitMap[type];
    var unit = void 0;
    if (unitClass) {
      unit = new unitClass(camera, item);
      unitCache.push(unit);
    }

    return unit;
  },
  removeUnit: function removeUnit(user) {
    var unit = unitCache.find(function (item) {
      return item.uuid === user.uuid;
    });
    unit.camera.removeChild(unit);
    var index = unitCache.findIndex(function (item) {
      return item.uuid === unit.uuid;
    });
    unitCache.splice(index, 1);
  },
  executeAllTasks: function executeAllTasks() {
    unitCache.forEach(function (unit) {
      unit.executeTask();
    });
  },
  getAllUnits: function getAllUnits() {
    return unitCache;
  },
  getNearbyUnitsByPosition: function getNearbyUnitsByPosition(position) {
    var detectRange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : detectAreaSize;

    return unitCache.filter(function (unit) {
      return Math.abs(unit.pxObj.position.x - position.x) < detectRange && Math.abs(unit.pxObj.position.y - position.y) < detectRange;
    });
  }
};

var DragRect = function (_Base) {
  inherits(DragRect, _Base);

  function DragRect(color) {
    classCallCheck(this, DragRect);

    var _this = possibleConstructorReturn(this, (DragRect.__proto__ || Object.getPrototypeOf(DragRect)).call(this));

    _this.pxObj = new PIXI.Graphics();
    _this.color = color;
    return _this;
  }

  createClass(DragRect, [{
    key: 'draw',
    value: function draw(startPosition, currentPosition) {
      var selectRectColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.color;

      if (!startPosition || !currentPosition) {
        return;
      }
      this.pxObj.clear();
      this.pxObj.lineStyle(1, selectRectColor);
      this.pxObj.drawRect(startPosition.x, startPosition.y, currentPosition.x - startPosition.x, currentPosition.y - startPosition.y);
    }
  }, {
    key: 'endDraw',
    value: function endDraw(startPosition, currentPosition, cameraPosition) {
      this.clear();

      var start = vector.minus(startPosition, cameraPosition);
      var end = vector.minus(currentPosition, cameraPosition);
      var rect = {
        x: start.x,
        y: start.y,
        width: end.x - start.x,
        height: end.y - start.y
      };

      if (!rect.width || !rect.height) {
        return [];
      }

      return map.getAllUnits().filter(function (item) {
        return rectCollisionDetect(item.getRect(), rect) && item.selectable;
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.pxObj.clear();
    }
  }]);
  return DragRect;
}(Base);

var loginPanel = document.querySelector('#loginPanel');
var loginForm = document.querySelector('#loginForm');

var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var limitX = winWidth - map.width;
var limitY = winHeight - map.height;
var moveTriggerDistance = 40;
var moveTriggerX = winWidth - moveTriggerDistance;
var moveTriggerY = winHeight - moveTriggerDistance;
var cameraMoveSpeed = 4;
var cameraMoveSpeedX = 0;
var cameraMoveSpeedY = 0;
var mousePos = void 0;

var renderer = PIXI.autoDetectRenderer(winWidth, winHeight);
document.body.appendChild(renderer.view);

renderer.view.style.position = "absolute";
renderer.view.style.width = window.innerWidth + "px";
renderer.view.style.height = window.innerHeight + "px";
renderer.view.style.display = "block";
renderer.backgroundColor = 0xffffff;

var stage = new PIXI.Container();
var camera = new PIXI.Container();
camera.interactive = true;
camera.position = {
  x: limitX / 2,
  y: limitY / 2
};

var fps = new PIXI.Text('', config.fontStyle);
fps.position = {
  x: 10,
  y: 10
};

stage.addChild(camera);
stage.addChild(fps);

var dragRect = new DragRect(config.selectRectColor);
dragRect.bindToContainer(stage);

var lastTime = Date.now();
var fpsIndex = 0;
var animate = function animate() {
  if (lastTime) {
    var now = Date.now();
    fpsIndex++;
    if (now - lastTime > 1000) {
      fps.setText(Math.round(1000 * fpsIndex / (now - lastTime)) + ' fps');
      fpsIndex = 0;
      lastTime = now;
    }
  }

  if (camera.position.x + cameraMoveSpeedX <= 0 && camera.position.x + cameraMoveSpeedX >= limitX) {
    camera.position.x += cameraMoveSpeedX;
  }

  if (camera.position.y + cameraMoveSpeedY <= 0 && camera.position.y + cameraMoveSpeedY >= limitY) {
    camera.position.y += cameraMoveSpeedY;
  }

  map.executeAllTasks();
  selectedUnits.renderSelectedRect();

  requestAnimationFrame(animate);
  renderer.render(stage);
};

var setup = function setup() {
  map.loadMap(camera);

  animate();
};

PIXI.loader.add('bg', 'resources/background.png').add('bullet', 'resources/bullet.png').add('explosion-0', 'resources/explosion-0.png').add('explosion-1', 'resources/explosion-1.png').add('explosion-2', 'resources/explosion-2.png').add('explosion-3', 'resources/explosion-3.png').add('tree', 'resources/tree.png').add('people', 'resources/people.png').load(setup);

var onDragStart = function onDragStart(event) {
  this.dragging = true;
  this.startPosition = event.data.getLocalPosition(this.parent);
};

var onDragEnd = function onDragEnd(event) {
  var endPosition = event.data.getLocalPosition(this.parent);

  if (vector.equal(this.startPosition, endPosition) && event.target === this && !event.data.originalEvent.shiftKey) {
    selectedUnits.removeAll();
  }

  if (!vector.equal(this.startPosition, endPosition)) {
    var list = dragRect.endDraw(this.startPosition, endPosition, camera.position);

    if (!event.data.originalEvent.shiftKey) {
      selectedUnits.removeAll();
    }

    list.forEach(function (item) {
      return selectedUnits.addOrRemove(item);
    });
  }

  this.dragging = false;
  this.startPosition = null;
};

var onDragMove = function onDragMove(event) {
  mousePos = event.data.getLocalPosition(this.parent);

  if (this.dragging) {
    cameraMoveSpeedX = 0;
    dragRect.draw(this.startPosition, mousePos);
  } else {
    if (mousePos.x <= moveTriggerDistance) {
      cameraMoveSpeedX = cameraMoveSpeed + (moveTriggerDistance - mousePos.x) / 5;
    } else if (mousePos.x >= moveTriggerX) {
      cameraMoveSpeedX = -cameraMoveSpeed + (moveTriggerX - mousePos.x) / 5;
    } else {
      cameraMoveSpeedX = 0;
    }

    if (mousePos.y <= moveTriggerDistance) {
      cameraMoveSpeedY = cameraMoveSpeed + (moveTriggerDistance - mousePos.y) / 5;
    } else if (mousePos.y >= moveTriggerY) {
      cameraMoveSpeedY = -cameraMoveSpeed + (moveTriggerY - mousePos.y) / 5;
    } else {
      cameraMoveSpeedY = 0;
    }
  }
};

var onRightClick = function onRightClick(event) {
  var currentPosition = event.data.getLocalPosition(this.parent);
  var tile = positionToTile(currentPosition, camera);

  selectedUnits.broadcast('moveTo', [tile, true]);
};

camera
// events for drag start
.on('mousedown', onDragStart).on('touchstart', onDragStart)
// events for drag end
.on('mouseup', onDragEnd).on('mouseupoutside', onDragEnd).on('touchend', onDragEnd).on('touchendoutside', onDragEnd)
// events for drag move
.on('mousemove', onDragMove).on('touchmove', onDragMove).on('rightclick', onRightClick);

renderer.view.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

document.addEventListener('keydown', function (e) {
  if (e.code === 'Space') {
    selectedUnits.broadcast('fire', [mousePos]);
  }
});

}());
