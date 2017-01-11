import config from '../config';
import vector from '../libs/vector';

export default (position, targetTile, camera = { position: { x: 0, y: 0 } }) => {
  const tile = {
    h: (position.x - camera.position.x) * 100 / config.unitSize / 100,
    v: (position.y - camera.position.y) * 100 / config.unitSize / 100,
  };
  return vector.equal(tile, targetTile);
};