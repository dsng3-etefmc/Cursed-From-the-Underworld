// Configurações do jogo
const configuration = {
	caracterSpeed: 5 // Velocidade do jogador
};

/**
 * Objetos do jogo
 */

class Player {
	constructor () {
		// player setup
		this.player = game.add.sprite(
			game.world.centerX,
			game.world.centerY, 
			'tank'
		);
		this.player.anchor.set(.5);
		this.player.maxHealth = 100;
		this.player.health = this.player.maxHealth;
		game.physics.enable(this.player);

		// HP bar - barra de vida
		this.hpBar = new HealthBar(game, {
			x: this.player.x, 
			y: this.player.y - 100,
			height: 20,
			width: 100
		});

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

	heal (val) {
		this.player.heal(val);
		this._updateHealthBar();
	}

	damage (val) {
		this.player.damage(val);
		this._updateHealthBar();
	}

	_updateHealthBar () {
		this.hpBar.setPercent(100 * this.player.health / this.player.maxHealth)
	}

	update () {
		// Atualiza Barra de vida
		this.hpBar.setPosition(this.player.x, this.player.y - 100);

		// Atualiza os canhões
		this.cannon.x = this.player.x;
		this.cannon.y = this.player.y;
		this.cannon.rotation = game.physics.arcade.angleToPointer(this.cannon);

		// Movimenta o personagem se wasd for pressionado
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

		// Gira o personagem com o cursor
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

class Enemy {
	constructor (hp) {
		this.hp
	}
}

class Demon extends Enemy {
	constructor () {
		super();
	}
}

/**
 * Lógica do jogo
 */

document.querySelector('body').style.cursor = 'crosshair';

// Variavel do framework reponsável por todo jogo
var game = new Phaser.Game(
	800,
	600,
	Phaser.CANVAS,
	'',
	{
		preload: preload,
		create: create,
		update: update,
		render: render
	}
);

/**
 * Váriaveis globais
 */
let player, // Jogador
	controls = {}, // Controles
	fireRate = 100, // Velocidade de disparo
	nextFire = 0; // ???

// Pré carrega alguns recursos
function preload() {
	game.load.image('tank','res/img/teste2.png');
	game.load.image('cannon','res/img/ivisivel.png');
	game.load.image('bullet','res/img/bullet.png');
	game.load.image('demonio','res/img/demonio.png');
	game.load.image('background', 'res/img/2testando.png');
}

// Função que cria os elementos do jogo
function create() {
	// Inicia as fisicas do jogo - ???
	game.physics.startSystem(Phaser.Physics.P2JS);

	// Adiciona o cenário do jogo
	this.add.image(0, 0, 'background');

	// Limita o tamanho do mundo - adiona as barreiras
	game.world.setBounds(0, 70, 1920, 1040);
	
	// Adiciona a imagem do demônio
	this.add.image(60, 250, 'demonio');

	// player
	player = new Player();
	
	// Controles
	controls.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
	controls.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
	controls.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
	controls.right = game.input.keyboard.addKey(Phaser.Keyboard.D);

	// Faz a câmera seguir o jogador
	game.camera.follow(player.player);
}

// Função que atualiza os elementos do jogo - rodada a cada frame
function update() {
	player.update();
}

// Função ??? - Debug
function render() {
	game.debug.cameraInfo(game.camera, 32, 32);
	game.debug.spriteCoords(player.player, 32, 500);
}
