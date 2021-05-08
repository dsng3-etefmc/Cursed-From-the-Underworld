// Configuração do jogo
const configuration = {
	caracterSpeed: 5
};

/**
 * Objetos
 */

class Player {
	constructor () {
		this.vida = 100;

		// player setup
		this.player = game.add.sprite(
			game.world.centerX,
			game.world.centerY, 
			'tank'
		);
		this.player.anchor.set(.5);
		game.physics.enable(this.player);

		// cannon setup
		this.cannon = game.add.sprite(
			this.player.x,
			this.player.y,
			'cannon'
		);
		this.cannon.anchor.set(.3,.5);
		game.physics.enable(this.cannon);
		
		this.bullets = game.add.group();
		this.bullets.enableBody = true;
		this.bullets.createMultiple(999,'bullet');
		this.bullets.setAll('checkWorldBounds',true);
		this.bullets.setAll('outOfBoundsKill',true);
		this.bullets.setAll('anchor.x',.5);
		this.bullets.setAll('anchor.y',.5);
	}

	update () {
		this.cannon.x = this.player.x;
		this.cannon.y = this.player.y;
		this.cannon.rotation = game.physics.arcade.angleToPointer(this.cannon);

		if(controls.up.isDown){
			this.player.y -= configuration.caracterSpeed;
		} 
		else if (controls.down.isDown) {
			this.player.y += configuration.caracterSpeed;
		}
	
		if (controls.left.isDown) {
			this.player.x -= configuration.caracterSpeed;
		}
		else if (controls.right.isDown) {
			this.player.x += configuration.caracterSpeed;
		}

		if (game.physics.arcade.distanceToPointer(this.player) > 10) {
			this.player.rotation = game.physics.arcade.angleToPointer(this.player);
		}

		// Atira se botão click ativado
		if(game.input.activePointer.isDown){
			this.fire();
		}

		//permite a realocação de um sprite em relação ao mundo do jogo
		//recebe como parâmetros: o sprite a ser realocado e uma margem em pixels 
		game.world.wrap(this.player, 75);
		game.world.wrap(this.cannon, 75);
	}

	fire () {
		if (game.time.now > nextFire && this.bullets.countDead() > 0){
			let bullet = this.bullets.getFirstDead();
			bullet.reset(
				this.cannon.x + Math.cos(this.cannon.rotation) * 80,
				this.cannon.y + Math.sin(this.cannon.rotation) * 80
			);
			
			game.physics.arcade.moveToPointer(bullet, 1000);
			
			nextFire = game.time.now + fireRate;
		}
	}
}

/**
 * Lógica do jogo
 */

document.querySelector('body').style.cursor = 'crosshair';

// Variavel do framework reponsável por todo jogo
var game = new Phaser.Game(
	window.innerWidth,
	window.innerHeight,
	Phaser.CANVAS,
	'',
	{
		preload: preload,
		create: create,
		update: update,
		render: render
	}
);

//Variáveis Globais
let player, // Jogador
	controls = {}, // Controles
	fireRate = 100, // Velocidade de disparo
	nextFire = 0; // ???

function preload() {
	game.load.image('tank','res/img/teste2.png');
	game.load.image('cannon','res/img/ivisivel.png');
	game.load.image('bullet','res/img/bullet.png');
	game.load.image('demonio','res/img/demonio.png');
	game.load.image('background', 'res/img/2testando.png');
}


// Função que cria os elementos do jogo
function create() {
	game.physics.startSystem(Phaser.Physics.P2JS);
	this.add.image(0, 0, 'background');

	game.world.setBounds(0, 70, 1920, 1040);
	
	this.add.image(60, 250, 'demonio');

	// player
	player = new Player();
	
	// Controles
	controls.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
	controls.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
	controls.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
	controls.right = game.input.keyboard.addKey(Phaser.Keyboard.D);

	game.camera.follow(player.player);
}

// Função que atualiza os elementos do jogo - rodada a cada frame
function update() {
	player.update();
}

// Função de debug
function render() {
	game.debug.cameraInfo(game.camera, 32, 32);
	game.debug.spriteCoords(player.player, 32, 500);
}
