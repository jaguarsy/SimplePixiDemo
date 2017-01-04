import map from '../map';
import Base from '../model/base';
import vector from '../libs/vector';
import rectCollisionDetect from '../libs/rectCollisionDetect';

class DragRect extends Base {

  constructor(color) {
    super();

    this.pxObj = new PIXI.Graphics();
    this.color = color;
  }

  draw(startPosition, currentPosition, selectRectColor = this.color) {
    if (!startPosition || !currentPosition) {
      return;
    }
    this.pxObj.clear();
    this.pxObj.lineStyle(1, selectRectColor);
    this.pxObj.drawRect(
      startPosition.x,
      startPosition.y,
      currentPosition.x - startPosition.x,
      currentPosition.y - startPosition.y);
  }

  endDraw(startPosition, currentPosition, cameraPosition) {
    this.clear();

    let start = vector.minus(startPosition, cameraPosition);
    let end = vector.minus(currentPosition, cameraPosition);
    let rect = {
      x: start.x,
      y: start.y,
      width: end.x - start.x,
      height: end.y - start.y,
    };

    if (!rect.width || !rect.height) {
      return [];
    }

    return map.getAllUnits()
      .filter(item => {
        return rectCollisionDetect(
            item.getRect(),
            rect) &&
          item.selectable
      });
  }

  clear() {
    this.pxObj.clear();
  }

}

export default DragRect;