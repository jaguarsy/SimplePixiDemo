import config from '../config';

export default (tile) => {
  const position = {};
  position.x = Math.round(tile.h * config.unitSize) + config.halfUnitSize;
  position.y = Math.round(tile.v * config.unitSize) + config.halfUnitSize;
  return position;
};