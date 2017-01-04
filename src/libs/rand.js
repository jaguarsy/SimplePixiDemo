export default (min, max) => {
  return min + Math.round(Math.random() * (max - min));
};