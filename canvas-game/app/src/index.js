import { CanvasView } from './view/CanvasView.js';
import { Collision } from './Collison';
// Images

// Level and colors

// Helpers
import { Camera } from './Camera.js';
import { MapGenerator } from './map/Map_gen.js';

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
	collision,
	camera,
	map
) {
	view.clear();
	map.draw();
	// camera.draw();
	// view.drawBricks(bricks);
	// view.drawSprite(paddle);
	// view.drawSprite(ball);

	requestAnimationFrame(() => gameLoop(view, collision, camera, map));
}

function startGame(view) {
	console.log("Game started");

	const viewDimensions = view.getDimensions();

	const collision = new Collision();

	const camera = new Camera(view.context, viewDimensions);

	const mapGenerator = new MapGenerator(view.context, viewDimensions);
	mapGenerator.generate();

	gameLoop(view, collision, camera, mapGenerator);
}

// Create a new view
const view = new CanvasView('#playField');
view.initStartButton(startGame);