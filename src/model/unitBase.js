import map from '../map';
import config from '../config';
import Base from './base';
import selectedUnits from './selectedUnits';
import guid from '../libs/guid';
import vector from '../libs/vector';
import initArray from '../libs/initArray';
import rectCollisionDetect from '../libs/rectCollisionDetect';
import positionToTile from '../utils/positionToTile';
import tileToPosition from '../utils/tileToPosition';
import tileToCenter from '../utils/tileToCenter';
import positionEqualTile from '../utils/positionEqualTile';

class UnitBase extends Base {

  constructor(camera, mapItem) {
    super();

    this.camera = camera;

    // 是否有碰撞体积，默认均为是
    this.collision = true;

    this.breakable = false;

    this.uuid = guid();
    this.pxObj = new PIXI.Sprite(
      PIXI.loader.resources[mapItem.name].texture
    );
    this.pxObj.position.set(mapItem.h * config.unitSize, mapItem.v * config.unitSize);
    this.tile = { h: mapItem.h, v: mapItem.v };

    camera.addChild(this.pxObj);

    this.pxObj.interactive = true;
    this.pxObj.on('click', this.selectHandler.bind(this));

    this.pen = new PIXI.Graphics();
    this.pen.setParent(camera);

    this.title = new PIXI.Text('', config.fontStyle);
    this.title.setParent(this.pxObj);
    this.title.y = -20;
  }

  setNickName(nickName) {
    this.nickName = nickName;
    this.refreshTitle();
  }

  refreshTitle() {
    this.title.setText(`${this.nickName || this.name} - ${this.state.hp}`);
  }

  addHP(value) {
    if (this.state && this.state.hp) {
      this.state.hp += value;
    }
    this.refreshTitle();
  }

  setPositionByTile(tile) {
    this.tile.h = tile.h;
    this.tile.v = tile.v;
    const position = tileToPosition(tile);
    this.pxObj.position.set(position.x, position.y);
  }

  getCenter() {
    return {
      x: this.pxObj.position.x + config.halfUnitSize,
      y: this.pxObj.position.y + config.halfUnitSize
    };
  }

  selectHandler(event) {
    if (this.selectable) {
      if (!event.data.originalEvent.shiftKey) {
        selectedUnits.removeAll();
      }

      selectedUnits.addOrRemove(this);
    }
  }

  executeTask() {
    if (!this.tasks.isEmpty()) {
      const task = this.tasks.peek();
      task.running = true;
      this[task.command].apply(this, task.args);
    }

    if (this.executeCustomTask) {
      this.executeCustomTask();
    }
  }

  drawMovingPath() {
    this.pen.clear();
    this.pen.lineStyle(1, 0x9acfff);

    const list = this.tasks.getQueue();

    for (let i = 0, len = list.length; i < len - 1; i++) {
      let task = list[i];
      let point = tileToCenter(task.args[0]);
      if (task.running) {
        let center = this.getCenter();
        this.pen.moveTo(center.x, center.y);
        this.pen.lineTo(point.x, point.y);
      }

      let nextPoint = tileToCenter(list[i + 1].args[0]);
      this.pen.moveTo(point.x, point.y);
      if (nextPoint) {
        this.pen.lineTo(nextPoint.x, nextPoint.y);
      }
    }
  }

  clearSelectedGraph() {
    this.pen.clear();
  }

  moveTo(targetTile, interrupt = false, currentTile = this.tile) {
    const allUnits = map.getAllUnits();
    const mapGraph = initArray(config.mapHSize, config.mapVSize, 1);

    allUnits.forEach(item => {
      if (item.collision) {
        mapGraph[item.tile.h][item.tile.v] = 0;
      }
    });

    if (interrupt) {
      const lastTask = this.tasks.dequeue();
      this.tasks.clear();
      if (lastTask && lastTask.running) {
        this.tasks.enqueue(lastTask);
        currentTile = lastTask.args[0];
      }
    }

    const graph = new Graph(mapGraph);
    const start = graph.grid[currentTile.h][currentTile.v];
    const end = graph.grid[targetTile.h][targetTile.v];
    const result = astar.search(graph, start, end);

    result.forEach((pathItem) => {
      this.tasks.enqueue({
        command: 'moveToTile',
        args: [{ h: pathItem.x, v: pathItem.y }],
      });
    });
  }

  getNearestFreeTile(velocity, units) {
    const newVelocity = { h: velocity.v, v: velocity.h };
    const vList = [newVelocity, velocity];
    let step = 0;
    let tile = vector.add({ h: this.tile.h, v: this.tile.v }, vList[step]);

    while (units.some(unit => unit !== this &&
    vector.equal(unit.tile, tile) &&
    unit.collision)) {
      step = 1 - step;
      tile = vector.add(tile, vList[step]);
    }

    return tile;
  }

  // task method
  moveToTile(targetTile) {
    const velocity = vector.minus(targetTile, this.tile);
    const targetPosition = tileToPosition(targetTile);
    const velocityH = this.props.speed * velocity.h;
    const velocityV = this.props.speed * velocity.v;

    const nextPosition = {
      x: this.pxObj.position.x + velocityH,
      y: this.pxObj.position.y + velocityV,
    };
    const nextTile = positionToTile(nextPosition);
    const nearbyUnits = map.getNearbyUnitsByPosition(nextPosition);

    // 运动中进行简单的碰撞检测
    if (nearbyUnits.some(unit => unit !== this &&
      vector.equal(unit.tile, nextTile) &&
      unit.collision)) {
      let task = this.tasks.dequeue();
      let prevTask;

      while (task && task.command === 'moveToTile') {
        prevTask = task;
        task = this.tasks.dequeue();
      }

      this.tasks.clear();

      const freeTile = this.getNearestFreeTile(velocity, nearbyUnits);
      this.setPositionByTile(freeTile);
      this.moveTo(freeTile);
      this.moveTo(prevTask.args[0], false, freeTile);
    } else {
      if (Math.abs(targetPosition.x - this.pxObj.position.x) < velocityH ||
        Math.abs(targetPosition.y - this.pxObj.position.y) < velocityV) {
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
}

export default UnitBase;