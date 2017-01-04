export default (hCount, vCount, value = 0) => {
  const arr = [];
  for (let i = 0; i < hCount; i++) {
    let row = [];
    for (let j = 0; j < vCount; j++) {
      row.push(value);
    }
    arr.push(row);
  }
  return arr;
};