import map from './map';
import config from './config';
import vector from './libs/vector';
import selectedUnits from './model/selectedUnits';
import DragRect from './utils/dragRect';
import positionToTile from './utils/positionToTile';
import tileToPosition from './utils/tileToPosition';

const loginPanel = document.querySelector('#loginPanel');
const loginForm = document.querySelector('#loginForm');

const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
const limitX = winWidth - map.width;
const limitY = winHeight - map.height;
const moveTriggerDistance = 40;
const moveTriggerX = winWidth - moveTriggerDistance;
const moveTriggerY = winHeight - moveTriggerDistance;
const cameraMoveSpeed = 4;
let cameraMoveSpeedX = 0;
let cameraMoveSpeedY = 0;
let mousePos;

const renderer = PIXI.autoDetectRenderer(winWidth, winHeight);
document.body.appendChild(renderer.view);

renderer.view.style.position = "absolute";
renderer.view.style.width = window.innerWidth + "px";
renderer.view.style.height = window.innerHeight + "px";
renderer.view.style.display = "block";
renderer.backgroundColor = 0xffffff;

const stage = new PIXI.Container();
const camera = new PIXI.Container();
camera.interactive = true;
camera.position = {
  x: limitX / 2,
  y: limitY / 2,
};

const fps = new PIXI.Text('', config.fontStyle);
fps.position = {
  x: 10,
  y: 10,
};

stage.addChild(camera);
stage.addChild(fps);

const dragRect = new DragRect(config.selectRectColor);
dragRect.bindToContainer(stage);

let lastTime = Date.now();
let fpsIndex = 0;
const animate = () => {
  if (lastTime) {
    let now = Date.now();
    fpsIndex++;
    if (now - lastTime > 1000) {
      fps.setText(`${Math.round(1000 * fpsIndex / (now - lastTime))} fps`);
      fpsIndex = 0;
      lastTime = now;
    }
  }

  if (camera.position.x + cameraMoveSpeedX <= 0 &&
    camera.position.x + cameraMoveSpeedX >= limitX) {
    camera.position.x += cameraMoveSpeedX;
  }

  if (camera.position.y + cameraMoveSpeedY <= 0 &&
    camera.position.y + cameraMoveSpeedY >= limitY) {
    camera.position.y += cameraMoveSpeedY;
  }

  map.executeAllTasks();
  selectedUnits.renderSelectedRect();

  requestAnimationFrame(animate);
  renderer.render(stage);
};

const setup = () => {
  map.loadMap(camera);

  animate();
};

PIXI.loader
  .add('bg', 'resources/background.png')
  .add('bullet', 'resources/bullet.png')
  .add('explosion-0', 'resources/explosion-0.png')
  .add('explosion-1', 'resources/explosion-1.png')
  .add('explosion-2', 'resources/explosion-2.png')
  .add('explosion-3', 'resources/explosion-3.png')
  .add('tree', 'resources/tree.png')
  .add('people', 'resources/people.png')
  .load(setup);

const onDragStart = function (event) {
  this.dragging = true;
  this.startPosition = event.data.getLocalPosition(this.parent);
};

const onDragEnd = function (event) {
  let endPosition = event.data.getLocalPosition(this.parent);

  if (vector.equal(this.startPosition, endPosition) &&
    event.target === this && !event.data.originalEvent.shiftKey) {
    selectedUnits.removeAll();
  }

  if (!vector.equal(this.startPosition, endPosition)) {
    let list = dragRect.endDraw(
      this.startPosition,
      endPosition,
      camera.position);

    if (!event.data.originalEvent.shiftKey) {
      selectedUnits.removeAll();
    }

    list.forEach(item => selectedUnits.addOrRemove(item));
  }

  this.dragging = false;
  this.startPosition = null;
};

const onDragMove = function (event) {
  mousePos = event.data.getLocalPosition(this.parent);

  if (this.dragging) {
    cameraMoveSpeedX = 0;
    dragRect.draw(this.startPosition, mousePos);
  } else {
    if (mousePos.x <= moveTriggerDistance) {
      cameraMoveSpeedX = cameraMoveSpeed + (moveTriggerDistance - mousePos.x) / 5;
    } else if (mousePos.x >= moveTriggerX) {
      cameraMoveSpeedX = -cameraMoveSpeed + (moveTriggerX - mousePos.x) / 5;
    } else {
      cameraMoveSpeedX = 0;
    }

    if (mousePos.y <= moveTriggerDistance) {
      cameraMoveSpeedY = cameraMoveSpeed + (moveTriggerDistance - mousePos.y) / 5;
    } else if (mousePos.y >= moveTriggerY) {
      cameraMoveSpeedY = -cameraMoveSpeed + (moveTriggerY - mousePos.y) / 5;
    } else {
      cameraMoveSpeedY = 0;
    }
  }
};

const onRightClick = function (event) {
  const currentPosition = event.data.getLocalPosition(this.parent);
  const tile = positionToTile(currentPosition, camera);

  selectedUnits.broadcast('moveTo', [tile, true]);
};

camera
// events for drag start
  .on('mousedown', onDragStart)
  .on('touchstart', onDragStart)
  // events for drag end
  .on('mouseup', onDragEnd)
  .on('mouseupoutside', onDragEnd)
  .on('touchend', onDragEnd)
  .on('touchendoutside', onDragEnd)
  // events for drag move
  .on('mousemove', onDragMove)
  .on('touchmove', onDragMove)
  .on('rightclick', onRightClick);

renderer.view.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    selectedUnits.broadcast('fire', [mousePos]);
  }
});