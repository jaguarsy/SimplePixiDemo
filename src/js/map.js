import mapData from './mapData';
import graphics from './model/graphics';
import People from './model/people';
import Tree from './model/tree';
import config from './config';
import vector from './libs/vector';
import rand from './libs/rand';

const unitMap = {
  people: People,
  tree: Tree,
};

const detectAreaSize = config.unitSize * 10;

const unitCache = [];

const getRandomTile = () => {
  return {
    h: rand(0, config.mapHSize),
    v: rand(0, config.mapVSize),
  };
};

const getRandomFreeTile = () => {
  let resultTile = getRandomTile();
  while (unitCache.some(unit => vector.equal(unit.tile, resultTile))) {
    resultTile = getRandomTile();
  }
  return resultTile;
};

const map = {
  width: config.mapHSize * config.unitSize,
  height: config.mapVSize * config.unitSize,

  loadData() {
    return mapData;
  },

  loadMap(camera) {
    const background = new PIXI.extras.TilingSprite(
      PIXI.loader.resources.bg.texture,
      this.width,
      this.height
    );
    camera.addChild(background);
    graphics.bindToContainer(camera);

    this.loadData().forEach(item => {
      const unitClass = unitMap[item.name];
      if (unitClass) {
        const unit = new unitClass(camera, item);
        unitCache.push(unit);
      }
    });
  },

  addUnit(camera, type) {
    const item = getRandomFreeTile();

    item.name = type;
    const unitClass = unitMap[type];
    let unit;
    if (unitClass) {
      unit = new unitClass(camera, item);
      unitCache.push(unit);
    }

    return unit;
  },

  removeUnit(user) {
    const unit = unitCache.find(item => item.uuid === user.uuid);
    unit.camera.removeChild(unit);
    const index = unitCache.findIndex(item => item.uuid === unit.uuid);
    unitCache.splice(index, 1);
  },

  executeAllTasks() {
    unitCache.forEach(unit => {
      unit.executeTask();
    });
  },

  getAllUnits() {
    return unitCache;
  },

  getNearbyUnitsByPosition(position, detectRange = detectAreaSize) {
    return unitCache.filter(unit => {
      return Math.abs(unit.pxObj.position.x - position.x) < detectRange &&
        Math.abs(unit.pxObj.position.y - position.y) < detectRange;
    });
  }

};

export default map;