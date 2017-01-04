import map from '../map';
import Base from './base';
import calDistance from '../libs/calDistance';
import rectCollisionDetect from '../libs/rectCollisionDetect';

class Bullet extends Base {

  constructor(camera) {
    super(camera);

    this.camera = camera;
    this.pxObj = new PIXI.Sprite(
      PIXI.loader.resources['bullet'].texture
    );

    this.pxObj.visible = false;
    this.pxObj.setParent(camera);

    this.props = {
      speed: 5,
      maxDistance: 500,
      damageValue: -10,
    };

    this.explosionTexture = [];
    for (let i = 0; i < 3; i++) {
      this.explosionTexture.push(
        PIXI.loader.resources[`explosion-${i}`].texture
      );
    }
    this.explosionAnimate = new PIXI.extras.AnimatedSprite(this.explosionTexture);

    this.active = false;
  }

  fire(position, target) {
    this.active = true;
    this.pxObj.visible = true;
    this.pxObj.position.set(position.x, position.y);

    const deltaX = target.x - position.x;
    const deltaY = target.y - position.y;
    const hypot = Math.hypot(deltaX, deltaY);
    // 计算速度分量
    const velocity = {
      h: this.props.speed * deltaX / hypot,
      v: this.props.speed * deltaY / hypot,
    };

    this.tasks.enqueue({
      command: 'keepMove',
      args: [position, velocity],
    });
  }

  keepMove(start, velocity) {
    this.pxObj.position.x += velocity.h;
    this.pxObj.position.y += velocity.v;

    if (calDistance(start, this.pxObj.position) >= this.props.maxDistance) {
      this.clear();
      this.tasks.dequeue();
    } else {
      const nearbyUnits = map.getNearbyUnitsByPosition(this.pxObj.position, 60);
      const hitUnit = nearbyUnits.find(unit => unit.breakable &&
      rectCollisionDetect(unit.getRect(), this.getRect()))
      if (hitUnit && hitUnit.uuid !== this.parent.uuid) {
        hitUnit.addHP(this.props.damageValue);
        this.clear();
        this.tasks.dequeue();
      }
    }
  }

  explode() {
    this.explosionAnimate.position.set(
      this.pxObj.position.x,
      this.pxObj.position.y
    );

    this.explosionAnimate.animationSpeed = 0.5;
    this.explosionAnimate.play();
    this.explosionAnimate.setParent(this.camera);
  }

  clear() {
    //    this.tasks.enqueue({
    //      command: 'explode',
    //      args: [],
    //    });

    this.active = false;
    this.pxObj.visible = false;
  }
}

export default Bullet;