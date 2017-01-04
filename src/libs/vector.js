export default {
  add: (v1, v2) => {
    if (!v1 || !v2) {
      return {};
    }

    const result = {};
    Object.keys(v1).forEach(key => result[key] = v1[key] + v2[key]);
    return result;
  },

  minus: (v1, v2) => {
    if (!v1 || !v2) {
      return {};
    }

    const result = {};
    Object.keys(v1).forEach(key => result[key] = v1[key] - v2[key]);
    return result;
  },

  equal: (v1, v2) => {
    if (!v1 || !v2) {
      return false;
    }

    return Object.keys(v1).every(key => v1[key] === v2[key]);
  },

  getCross: (p1, p2, p) => {
    return (p2.x - p1.x) * (p.y - p1.y) - (p.x - p1.x) * (p2.y - p1.y);
  },
};