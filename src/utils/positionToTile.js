import config from '../config';

export default (position, camera = { position: { x: 0, y: 0 } }) => {
  const tile = {};
  tile.h = Math.floor((position.x - camera.position.x) / config.unitSize);
  tile.v = Math.floor((position.y - camera.position.y) / config.unitSize);
  return tile;
};