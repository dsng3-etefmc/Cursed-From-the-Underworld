const configuration = {
	caracterSpeed: 5
};

(function(){
	document.querySelector('body').style.cursor = 'crosshair';
	
	var game = new Phaser.Game(
		window.innerWidth,
		window.innerHeight,
		Phaser.CANVAS,
		'',
		{
			preload: preload,
			create: create,
			update: update
		}
	);
	
	//Variáveis Globais
	let tank,
		controls = {},
		cannon,
		bullets,
		fireRate = 100,
		nextFire = 0;
	
	function preload() {
		game.load.image('tank','res/img/teste2.png');
		game.load.image('cannon','res/img/ivisivel.png');
		game.load.image('bullet','res/img/bullet.png');
		game.load.image('demonio','res/img/demonio.png');
		this.load.image('background', 'res/img/2testando.png');
	}
	
	function create() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.add.image(0, 0, 'background')
		
		this.add.image(60, 250, 'demonio')

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
		
		
		controls.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
		controls.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
		controls.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
		controls.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
	}
	
	function update() {
		cannon.x = tank.x;
		cannon.y = tank.y;
		cannon.rotation = game.physics.arcade.angleToPointer(cannon);

		//Aplica uma velocidade nos eixos X e Y do sprite dado o de inclinação deste
		//Recebe como parâmetros: a inclinação em radianos, a velocidade a ser aplicada e o parâmetro a ser afetado
		if(controls.up.isDown){
			tank.y -= configuration.caracterSpeed;
			// game.physics.arcade.velocityFromRotation(tank.rotation,300,tank.body.velocity);
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
	
	function fire(){
		if (game.time.now > nextFire && bullets.countDead() > 0){
			let bullet = bullets.getFirstDead();
			bullet.reset(cannon.x + Math.cos(cannon.rotation) * 80,cannon.y + Math.sin(cannon.rotation) * 80);
			
			game.physics.arcade.moveToPointer(bullet,1000);
			
			nextFire = game.time.now + fireRate;
		}
	}
	
}());
