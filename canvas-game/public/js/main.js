import { HealthBar } from './HealthBar.js';

// Configurações do jogo
const configuration = {
	caracterSpeed: 250 // Velocidade do jogador
};

/**
 * Objetos do jogo
 */
class Player { //class pro jogador
	constructor () {
		// player setup
		this.player = game.add.sprite(
			game.world.centerX,
			game.world.centerY, 
			'player'
		);
		this.player.anchor.set(.5);
		this.player.maxHealth = 100;
		this.player.health = this.player.maxHealth;
		game.physics.enable(this.player);

		// Animation
		this.playerAnimations = {
			walkUp: 2,
			walkDown: 1,
			walkLeft: 3,
			walkRight: 4
		}
		for (let animation in this.playerAnimations) {
			this.player.animations.add(
				animation, 
				this._walkingAnimationsKeyframes(this.playerAnimations[animation])
			);
		}
		this.player.smoothed = false;
    	this.player.scale.set(4);
		this.lastAnimation = null;

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
		
		//tiros
		this.bullets = game.add.physicsGroup();
		this.bullets.enableBody = true;
		this.bullets.createMultiple(999,'bullet');  //tanto de tiro que o personagem pode dar
		this.bullets.setAll('checkWorldBounds',true);
		this.bullets.setAll('outOfBoundsKill',true);
		this.bullets.setAll('anchor.x',.5);
		this.bullets.setAll('anchor.y',.5);
	}

	_walkingAnimationsKeyframes (s) {
		return [0, 1, 2, 3, 4, 5, 6, 7].map(n => n + 9 * (s - 1)) //frames da animação
	}

	//cura a vida do personagem
	heal (val) {
		this.player.heal(val);
		this._updateHealthBar();
	}

	//abaixa a vida do personagem (principal)
	damage (val) {
		this.player.damage(val);
		this._updateHealthBar();
	}

	_updateHealthBar () {
		this.hpBar.setPercent(100 * this.player.health / this.player.maxHealth)
	}

	update () {
		// Atualiza os canhões
		this.cannon.x = this.player.x;
		this.cannon.y = this.player.y;
		this.cannon.rotation = game.physics.arcade.angleToPointer(this.cannon);

		this.player.body.velocity.set(0);

		// Movimenta o personagem se wasd for pressionado
		let which_animation = null;
		if(controls.up.isDown){
			which_animation = 'walkUp';
			this.player.body.velocity.y = -configuration.caracterSpeed;
		} 
		if (controls.down.isDown) {
			which_animation = 'walkDown';
			this.player.body.velocity.y = configuration.caracterSpeed;
		}
		if (controls.left.isDown) {
			which_animation = 'walkLeft';
			this.player.body.velocity.x = -configuration.caracterSpeed;
		}
		if (controls.right.isDown) {
			which_animation = 'walkRight';
			this.player.body.velocity.x = configuration.caracterSpeed;
		}

		// Atualiza Barra de vida
		this.hpBar.setPosition(this.player.x, this.player.y - 100);

		// Animation
		if (which_animation !== null) {
			this.player.play(which_animation, 15, true);
		} else {
			let keyframe = this._walkingAnimationsKeyframes(
				this.playerAnimations[this.lastAnimation]
			)[0];
			this.player.animations.stop();
			this.player.animations.frame = keyframe;
		}
		this.lastAnimation = which_animation;

		// Atira se botão click ativado
		if(game.input.activePointer.isDown){
			this.fire();
		}

		//permite a realocação de um sprite em relação ao mundo do jogo
		//recebe como parâmetros: o sprite a ser realocado e uma margem em pixels 
		game.world.wrap(this.player, 75);      //realoca o personagem do outro lado do mapa
		game.world.wrap(this.cannon, 75);
	}

	fire () { //o personagem atira
		if (game.time.now > nextFire && this.bullets.countDead() > 0){
			let bullet = this.bullets.getFirstDead();
			bullet.reset(
				this.cannon.x + Math.cos(this.cannon.rotation) * 80,
				this.cannon.y + Math.sin(this.cannon.rotation) * 80
			);
			
			game.physics.arcade.moveToPointer(bullet, 1000);
			
			nextFire = game.time.now + fireRate; //quarda a informação do tempo do tiro
		}
	}
}
//classe para o inimigo-------------
class Enemy {
	constructor (sprite, hitDelay = 1000) {
		this.sprite = sprite
		this.healthBar = new HealthBar(game, {
			x: this.sprite.x, 
			y: this.sprite.y - 100,
			height: 20,
			width: 100
		});

		this.hitdelay = hitDelay;
		this.nextHit = 0
	}

	hit (aObject) {
		if (game.time.now > this.nextHit) {
			this.nextHit = game.time.now + this.hitdelay;
			aObject.damage(20);
		}
	}

	damage (val) {
		this.sprite.damage(val);
		this._updateHealthBar();
	}

	heal (val) {
		this.sprite.damage(val);
		this._updateHealthBar();
	}

	_moveHealthBar () {
		this.healthBar.setPosition(this.sprite.x, this.sprite.y - 100);
	}

	_updateHealthBar () {
		this.healthBar.setPercent(100 * this.sprite.health / this.sprite.maxHealth);
	}
}
//-------------
class Demon extends Enemy {
	constructor () {
		const sprite = game.add.sprite(150, 250, 'demon'); //adiciona o demonio
		game.physics.enable(sprite);
		sprite.anchor.set(.5);
		sprite.scale.set(.5);

		var walk = sprite.animations.add('walk', [0, 1, 2, 3]);
		sprite.play('walk', 5, true);

		sprite.maxHealth = 500;  // do demonio
		sprite.health = sprite.maxHealth;  //hp maximo

		super(sprite);
	}

	moveToPlayer (player) {
		if (game.physics.arcade.distanceBetween(this.sprite, player) > 10) {
			game.physics.arcade.moveToObject(this.sprite, player, 200);
		} else {
			this.sprite.body.velocity.set(0);
		}
	}

	update () {
		this._moveHealthBar();
	}
}

/**
 * Lógica do jogo
 */

const get_image = (name) => `public/img/${name}`;  //retorna um link para imagem

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
	demons,
	demonsGroup,
	demon,
	controls = {}, // Controles
	fireRate = 100, // Velocidade de disparo
	nextFire = 0; // ???  proximo tiro salva a informação (parar de atirar)

// Pré carrega alguns recursos
function preload() {
	game.load.image('tank', get_image('teste2.png'));
	game.load.image('cannon', get_image('ivisivel.png'));
	game.load.image('bullet', get_image('bullet.png'));
	game.load.image('demonio', get_image('demonio.png'));
	game.load.image('background', get_image('2testando.png'));
	game.load.spritesheet('demon', get_image('demon_spritesheet.png'), 180, 180, 36);
	game.load.spritesheet('player', get_image('player.png'), 24, 32, 36);
}

// Função que cria os elementos do jogo
function create() {
	// Inicia as fisicas do jogo - ???
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// Adiciona o cenário do jogo
	this.add.image(0, 0, 'background');   

	// Limita o tamanho do mundo - adiona as barreiras
	game.world.setBounds(0, 70, 1920, 1040); //barreira/limite

	// player
	player = new Player();  //variaveis de cada personagem
	demon = new Demon(); //variaveis de cada personagem

	// Implementação de multiplo demonios - descontinuada
	// demons = [];
	// demonsGroup = game.add.group();
	// for (let i = 0; i < 10; i++) {
	// 	demons.push(new Demon());
	// 	game.add
	// }
	// console.log(demons)
	
	// Controles
	controls.up = game.input.keyboard.addKey(Phaser.Keyboard.W);    //fazer o personagem mexer
	controls.left = game.input.keyboard.addKey(Phaser.Keyboard.A);   //fazer o personagem mexer
	controls.down = game.input.keyboard.addKey(Phaser.Keyboard.S);  //fazer o personagem mexer
	controls.right = game.input.keyboard.addKey(Phaser.Keyboard.D);  //fazer o personagem mexer

	// Faz a câmera seguir o jogador
	game.camera.follow(player.player);
}

// Função que atualiza os elementos do jogo - rodada a cada frame
function update() {
	player.update();
	demon.update();
	demon.moveToPlayer(player.player);

	let bulletAndDemonCollision = game.physics.arcade.overlap(
		demon.sprite, 
		player.bullets, 
		(demonSprite, bullet) => {
			demon.damage(10);
			bullet.kill();
		}
	);
	
	if (bulletAndDemonCollision) {
        console.log('boom');
    }

	let playerAndDemonCollision = game.physics.arcade.overlap(
		player.player, 
		demon.sprite, 
		() => console.log('boom'), 
		null, 
		this
	);
	
	if (playerAndDemonCollision) {
		demon.hit(player);
	}
}

// Função ??? - Debug
function render() {
	// game.debug.cameraInfo(game.camera, 32, 32);       //cordenadas
	// game.debug.spriteCoords(player.player, 32, 500);  //cordenadas do jogador
	game.debug.body(player.player);
	game.debug.body(player.bullets);
	game.debug.body(demon.sprite);
}