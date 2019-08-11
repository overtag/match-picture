import * as PIXI from "pixi.js";
import level from "../../assets/level.json";
export class Core extends PIXI.Container {
  constructor() {
    super();

    this.layers = {
      standart: new PIXI.Container(),
      LayerAMiddle: new PIXI.Container(),
      LayerBMiddle: new PIXI.Container()
    };
    const sprite = new PIXI.Sprite(PIXI.Texture.fromImage("Layer_0"));
    const sprite1 = new PIXI.Sprite(PIXI.Texture.fromImage("Layer_0"));
    this.addChild(this.layers.standart);
    this.addChild(this.layers.LayerAMiddle);
    this.addChild(this.layers.LayerBMiddle);

    this.layers.LayerAMiddle.addChild(sprite);
    this.layers.LayerBMiddle.addChild(sprite1);
    this.layers.LayerBMiddle.y = this.layers.LayerAMiddle.height;
    this.parseJSON();
  }

  parseJSON() {
    const { slots } = level.skins;
    for (let i = 1; i < slots.length; i++) {
      const slot = slots[i];

      const sprite = new PIXI.Sprite(PIXI.Texture.fromImage(slot.name));
      sprite.anchor.set(0.5, 0.5);
      sprite.position.set(slot.x, slot.y);
      this.layers[slot.layer].addChild(sprite);
    }
  }
}
