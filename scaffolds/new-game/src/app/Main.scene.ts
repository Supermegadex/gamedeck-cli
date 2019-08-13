import { Scene } from 'gamedeck/lib/Scene';
import { Game } from 'gamedeck/lib/Game';
import { Rectangle } from 'gamedeck/lib/GObjects';
import { Vector2 } from 'gamedeck/lib/Utils';
import { Ball } from './gobjects/Ball.go';

export class Main extends Scene {
  dotPosition = new Vector2(10, 10);

  build(game: Game) {
    return new Rectangle({
      color: 'white',
      x: 0,
      y: 0,
      width: game.width,
      height: game.height,
      children: [
        new Ball({
          position: this.dotPosition,
          radius: 10,
          color: 'black'
        })
      ]
    });
  }

  update(game: Game) {
    this.dotPosition = new Vector2(
      Math.cos(game.frame / 50) * 100 + game.width / 2 - 10,
      Math.sin(game.frame / 50) * 100 + game.height / 2 - 10
    );
  }
}
