import graphics from './graphics';
import config from '../config';

const selectedMap = {};

export default {
  add(unit) {
    selectedMap[unit.uuid] = unit;
  },

  remove(unit) {
    if (typeof unit === 'string') {
      selectedMap[unit].clearSelectedGraph();
      delete selectedMap[unit];
    } else {
      unit.clearSelectedGraph();
      delete selectedMap[unit.uuid];
    }
  },

  addOrRemove(unit) {
    if (selectedMap[unit.uuid]) {
      this.remove(unit.uuid);
    } else {
      selectedMap[unit.uuid] = unit;
    }
  },

  removeAll() {
    Object.keys(selectedMap).forEach(key => {
      this.remove(key);
    });
  },

  contains(uuid) {
    return !!selectedMap[uuid];
  },

  each(func) {
    Object.keys(selectedMap).forEach(key => {
      const unit = selectedMap[key];
      func(unit);
    });
  },

  broadcast(command, params) {
    this.each(unit => {
      unit[command].apply(unit, params);
    });
  },

  renderSelectedRect() {
    graphics.clear();

    this.each(unit => {
      let selectRect = unit.getSelectRect();
      graphics.drawRect(
        selectRect.x,
        selectRect.y,
        selectRect.width,
        selectRect.height,
        config.selectRectColor
      );

      unit.drawMovingPath();
    });
  }
};