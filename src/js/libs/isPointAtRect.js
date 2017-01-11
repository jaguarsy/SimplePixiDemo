import vector from './vector';

export default (p, p1, p3) => {
  const p2 = { x: p1.x, y: p3.y };
  const p4 = { x: p3.x, y: p1.y };

  return vector.getCross(p1, p2, p) * vector.getCross(p3, p4, p) > 0 &&
    vector.getCross(p2, p3, p) * vector.getCross(p4, p1, p) > 0;
};