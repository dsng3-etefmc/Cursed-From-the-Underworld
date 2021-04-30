import { CanvasView } from './view/CanvasView.js';
import { Collision } from './Collison';
// Images


// Level and colors

// Helpers
import { createBricks } from './helpers';

let gameOver = false;
let score = 0;

function setGameOver(view) {
	view.drawInfo('Game Over!');
	gameOver = false;
}

function setGameWin(view) {
	view.drawInfo('Game Won!');
	gameOver = false;
}

function gameLoop(
	view,
	collision
) {
	view.clear();
	// view.drawBricks(bricks);
	// view.drawSprite(paddle);
	// view.drawSprite(ball);

	requestAnimationFrame(() => gameLoop(view, collision));
}

function startGame(view, collision) {
	

	gameLoop(view, collision);
}

// Create a new view
const view = new CanvasView('#playField');
view.initStartButton(startGame);