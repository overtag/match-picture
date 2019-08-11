import * as PIXI from "pixi.js";
import { Core } from "./view/Core.js";

class App {
  constructor(canvas) {
    console.log("HELLO WORLD");
    this.defaultWidth = 100;
    this.defaultHeight = 100;
    this.canvas = canvas;
    this.canvas.width = this.defaultWidth;
    this.canvas.height = this.defaultHeight;
    window.canvas = this.canvas;
    PIXI.loader
      .add("Bag", "./../assets/images/Bag.png")
      .add("Hand", "./../assets/images/Hand.png")
      .add("Head", "./../assets/images/Head.png")
      .add("Lamp", "./../assets/images/Lamp.png")
      .add("Layer_0", "./../assets/images/Layer_0.jpg")
      .add("Picture", "./../assets/images/Picture.png")
      .load(this.init.bind(this));
  }

  init() {
    const stage = new PIXI.Container();
    const renderer = PIXI.autoDetectRenderer(
      this.canvas.width,
      this.canvas.height,
      {
        view: this.canvas,
        transparent: true,
        antialias: true,
        autoResize: true
      }
    );

    this.app = { stage, renderer, view: this.canvas };

    requestAnimationFrame(this.update.bind(this));

    this.viewWidth = 1;
    this.viewHeight = 1;

    this.core = new Core();
    this.core.visible = true;
    this.app.stage.addChild(this.core);

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
  }

  update() {
    this.app.renderer.render(this.app.stage);
    requestAnimationFrame(this.update.bind(this));
  }

  onResize() {
    let width = window.innerWidth; // document.getElementById('visualization').clientWidth;
    let height = window.innerHeight;

    const canvas = this.app.view;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = width;
    canvas.height = height;

    this.app.renderer.resize(width, height);
  }

  resize() {
    this.onResize();
    const sW = ((this.app.view.width / 1602) * 10) / 10;
    const sH = ((this.app.view.height / (1002 * 2)) * 10) / 10;
    let koef = sW < sH ? sW : sH;

    this.core.scale.set(koef);
    this.core.position.set(
      this.app.view.width / 2 - this.core.width / 2,
      this.app.view.height / 2 - this.core.height / 2
    );
  }
}

var canvas = document.getElementById("game-canvas");
window.app = new App(canvas);
