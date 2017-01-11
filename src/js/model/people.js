import UnitBase from './unitBase';
import Bullet from './bullet';

class People extends UnitBase {

  constructor(camera, item) {
    super(camera, item);

    this.name = 'people';
    // 是否可以选中
    this.selectable = true;
    // 无碰撞体积
    this.collision = false;
    // 可以被破坏
    this.breakable = true;
    this.pxObj.buttonMode = true;

    this.props = {
      speed: 2,
      bulletLimit: 3,
    };

    this.state = {
      hp: 100,
    };

    this.skills = {};

    this.bullets = [];

    for (let i = 0; i < this.props.bulletLimit; i++) {
      const bullet = new Bullet(camera);
      bullet.parent = this;
      this.bullets.push(bullet);
    }

    this.refreshTitle();
  }

  executeCustomTask() {
    this.bullets.forEach(bullet => {
      if (!bullet.tasks.isEmpty()) {
        const task = bullet.tasks.peek();
        task.running = true;
        bullet[task.command].apply(bullet, task.args);
      }
    });
  }

  fire(targetPosition) {
    const target = {
      x: targetPosition.x - this.camera.position.x,
      y: targetPosition.y - this.camera.position.y,
    };
    const freeBullet = this.bullets.find(item => !item.active);

    if (freeBullet) {
      freeBullet.fire(this.getCenter(), target);
    }
  }

}

export default People;