// Types
import { Brick } from '../sprites/Brick';
import { Paddle } from '../sprites/Paddle';
import { Ball } from '../sprites/Ball';

export class CanvasView {

    constructor(canvasName) {
        this.canvas = document.querySelector(canvasName);
        this.context = this.canvas.getContext('2d');
        this.scoreDisplay = document.querySelector('#score');
        this.start = document.querySelector('#start');
        this.info = document.querySelector('#info');
    }

    clear() {
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    initStartButton(startFunction) {
        this.start?.addEventListener('click', () => startFunction(this));
    }

    drawScore(score) {
        if (this.scoreDisplay) this.scoreDisplay.innerHTML = score.toString();
    }

    drawInfo(text) {
        if (this.info) this.info.innerHTML = text;
    }

    drawSprite(brick) {
        if (!brick) return;

        this.context?.drawImage(
            brick.image,
            brick.pos.x,
            brick.pos.y,
            brick.width,
            brick.height
        );
    }

    drawBricks(bricks) {
        bricks.forEach(brick => this.drawSprite(brick));
    }
}