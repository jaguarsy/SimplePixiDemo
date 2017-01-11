import UnitBase from './unitBase';

class Tree extends UnitBase {

  constructor(camera, item) {
    super(camera, item);

    this.name = 'tree';
    this.selectable = false;
  }

}

export default Tree;