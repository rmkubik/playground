import * as PIXI from "pixi.js";
import fogOwlImage from "./fog_owl.gif";
import miscSheet from "./images/16x16_misc.png";
import "./main.scss";

class SpriteSheet {
  constructor({
    texture,
    frameWidth,
    frameHeight,
    frameSpacing = 0,
    sheetMargin = 0,
  }) {
    this.texture = texture;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameSpacing = frameSpacing;
    this.sheetMargin = sheetMargin;
  }

  createSprite({ row = 0, col = 0 }) {
    let x = col * (this.frameWidth + this.frameSpacing) + this.sheetMargin;
    let y = row * (this.frameHeight + this.frameSpacing) + this.sheetMargin;

    let rectangle = new PIXI.Rectangle(x, y, this.frameWidth, this.frameHeight);

    this.texture.frame = rectangle;

    return new PIXI.Sprite(this.texture);
  }
}

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
const app = new PIXI.Application({
  // transparent: true,
});
app.renderer.autoResize = true;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);

// load the texture we need
app.loader
  .add("fogOwl", fogOwlImage)
  .add("miscSheet", miscSheet)
  .load((loader, resources) => {
    // This creates a texture from a 'bunny.png' image.
    const fogOwl = new PIXI.Sprite(resources.fogOwl.texture);
    const miscSheet = new SpriteSheet({
      texture: resources.miscSheet.texture,
      frameHeight: 16,
      frameWidth: 16,
      frameSpacing: 6,
      sheetMargin: 3,
    });
    const miscSprite = miscSheet.createSprite({ row: 0, col: 10 });
    miscSprite.x = 32;
    miscSprite.y = 32;

    // Setup the position of the bunny
    fogOwl.x = app.renderer.width / 2;
    fogOwl.y = app.renderer.height / 2;

    // Rotate around the center
    fogOwl.anchor.x = 0.5;
    fogOwl.anchor.y = 0.5;

    // Add the bunny to the scene we are building.
    app.stage.addChild(fogOwl);
    app.stage.addChild(miscSprite);

    // Listen for frame updates
    app.ticker.add(() => {
      // each frame we spin the bunny around a bit
      fogOwl.rotation += 0.01;
    });
  });
