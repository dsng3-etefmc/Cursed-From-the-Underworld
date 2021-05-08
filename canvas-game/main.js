// Configuração do jogo
const configuration = {
	caracterSpeed: 5
};

// Lógica do jogo
(function(){
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
	let tank, // Jogador
		controls = {}, // Controles
		cannon, // ???
		bullets, // Tiros da arma
		fireRate = 100, // Velocidade de disparo
		nextFire = 0; // ???
	
	function preload() {
		game.load.image('tank','res/img/teste2.png');
		game.load.image('cannon','res/img/ivisivel.png');
		game.load.image('bullet','res/img/bullet.png');
		this.load.image('background', 'res/img/2testando.png');
	}
	

	// Função que cria os elementos do jogo
	function create() {
		game.physics.startSystem(Phaser.Physics.P2JS);
		this.add.image(0, 0, 'background');

		game.world.setBounds(0, 70, 1920, 1040);
		
		tank = game.add.sprite(game.world.centerX,game.world.centerY,'tank');
		tank.anchor.set(.5);
		game.physics.enable(tank);
		
		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.createMultiple(999,'bullet');
		bullets.setAll('checkWorldBounds',true);
		bullets.setAll('outOfBoundsKill',true);
		bullets.setAll('anchor.x',.5);
		bullets.setAll('anchor.y',.5);
		
		cannon = game.add.sprite(tank.x,tank.y,'cannon');
		cannon.anchor.set(.3,.5);
		game.physics.enable(cannon);
		
		// Controles
		controls.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
		controls.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
		controls.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
		controls.right = game.input.keyboard.addKey(Phaser.Keyboard.D);

		game.camera.follow(tank);
		console.log(Phaser)
		console.log(game)
		console.log(controls)
	}
	
	// Função que atualiza os elementos do jogo - rodada a cada frame
	function update() {
		cannon.x = tank.x;
		cannon.y = tank.y;
		cannon.rotation = game.physics.arcade.angleToPointer(cannon);

		// Movimenta o personagem caso tecla X apertada
		if(controls.up.isDown){
			tank.y -= configuration.caracterSpeed;
		} 
		else if (controls.down.isDown) {
			tank.y += configuration.caracterSpeed;
		}

		if (controls.left.isDown) {
			tank.x -= configuration.caracterSpeed;
		}
		else if (controls.right.isDown) {
			tank.x += configuration.caracterSpeed;
		}
		
		if (game.physics.arcade.distanceToPointer(tank) > 10) {
			tank.rotation = game.physics.arcade.angleToPointer(tank);
		}
		// if(controls.left.isDown) {
		// 	tank.body.rotation += controls.down.isDown ? 1 : -1;
		// } 
		// else if(controls.right.isDown) {
		// 	tank.body.rotation += controls.down.isDown ? -1 : 1;
		// }
		
		if(game.input.activePointer.isDown){
			fire();
		}
		
		//permite a realocação de um sprite em relação ao mundo do jogo
		//recebe como parâmetros: o sprite a ser realocado e uma margem em pixels 
		game.world.wrap(tank,75);
		game.world.wrap(cannon,75);
	}

	// Função de debug
	function render() {
		game.debug.cameraInfo(game.camera, 32, 32);
    	game.debug.spriteCoords(tank, 32, 500);
	}
	
	function fire(){
		if (game.time.now > nextFire && bullets.countDead() > 0){
			let bullet = bullets.getFirstDead();
			bullet.reset(cannon.x + Math.cos(cannon.rotation) * 80,cannon.y + Math.sin(cannon.rotation) * 80);
			
			game.physics.arcade.moveToPointer(bullet,1000);
			
			nextFire = game.time.now + fireRate;
		}
	}
	
}());
