import Base from './base';

class Graphics extends Base {

  constructor() {
    super();

    this.pxObj = new PIXI.Graphics();
  }

  clear() {
    this.pxObj.clear();
  }

  drawRect(x, y, width, height, color) {
    this.pxObj.lineStyle(1, color);
    return this.pxObj.drawRect(x, y, width, height);
  }

}

export default new Graphics();