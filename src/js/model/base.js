import Queue from '../libs/queue';

class Base {

  constructor() {
    this.tasks = new Queue();
  }

  getRect(position = this.pxObj.position) {
    return {
      x: position.x,
      y: position.y,
      width: this.pxObj.width,
      height: this.pxObj.height,
    };
  }

  getSelectRect() {
    return {
      x: this.pxObj.position.x,
      y: this.pxObj.position.y,
      width: this.pxObj.width + 1,
      height: this.pxObj.height + 1,
    };
  }

  bindToContainer(camera) {
    this.pxObj.setParent(camera);
  }

}

export default Base;