class Power {
	//document.querySelector('body').style.cursor = 'crosshair';
	
	constructor () {
		this.game = new Phaser.Game(800,600,Phaser.CANVAS,'',{preload:preload,create:create,update:update});

		//Variáveis Globais
		this.tank;
		this.controls = {};
		this.cannon;
		this.bullets;
		this.fireRate = 100;
		this.nextFire = 0;
	}

	
	
	preload () {
		//game.load.image('tank','img/tank.png');
		//game.load.image('cannon','img/cannon.png');
		this.game.load.image('bullet','img/bullet.png');
	}
	
	create () {
		//game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.stage.backgroundColor = '#C78839';
		
		this.tank = game.add.sprite(game.world.centerX,game.world.centerY,'tank');
		//tank.anchor.set(.5);
		this.game.physics.enable(tank);
		
		this.ullets = game.add.group();
		this.bullets.enableBody = true;
		this.bullets.createMultiple(9999,'bullet'); // tiro
		//bullets.setAll('checkWorldBounds',true);
		//bullets.setAll('outOfBoundsKill',true);
		//bullets.setAll('anchor.x',.5);
		//bullets.setAll('anchor.y',.5);
		
		this.cannon = game.add.sprite(tank.x,tank.y,'cannon');
		//cannon.anchor.set(.3,.5);
		//game.physics.enable(cannon);
		
		
		this.controls.up = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.controls.left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.controls.down = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.controls.right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
	}
	
	update () {
		this.cannon.x = this.tank.x;
		this.cannon.y = this.tank.y;
		this.cannon.rotation = game.physics.arcade.angleToPointer(cannon);
	
		if(this.controls.up.isDown){
			//Aplica uma velocidade nos eixos X e Y do sprite dado o de inclinação deste
			//Recebe como parâmetros: a inclinação em radianos, a velocidade a ser aplicada e o parâmetro a ser afetado
			this.game.physics.arcade.velocityFromRotation(tank.rotation,100,tank.body.velocity);
		} else
		if(this.controls.down.isDown){
			this.game.physics.arcade.velocityFromRotation(tank.rotation,-50,tank.body.velocity);
		} else {
			this.tank.body.velocity.set(0);
		}
		
		if(this.controls.left.isDown){
			if(controls.down.isDown){
				this.tank.body.rotation++;
			} else {
				this.tank.body.rotation--;
			}
		} else
		if(this.controls.right.isDown){
			if(controls.down.isDown){
				this.tank.body.rotation--;
			} else {
				this.tank.body.rotation++;
			}
		}
		
		if(this.game.input.activePointer.isDown){
			fire();
		}
		
		//permite a realocação de um sprite em relação ao mundo do jogo
		//recebe como parâmetros: o sprite a ser realocado e uma margem em pixels 
		//game.world.wrap(tank,75);
		//game.world.wrap(cannon,75);
	}
	
	fire () {
		if(this.game.time.now > nextFire && this.bullets.countDead() > 0){
			var bullet = this.bullets.getFirstDead();
			bullet.reset(
				cannon.x + Math.cos(cannon.rotation) * 80,cannon.y + Math.sin(cannon.rotation) * 80
			);
			
			this.game.physics.arcade.moveToPointer(bullet,300);
			
			nextFire = this.game.time.now + this.fireRate;
		}
	}
	
}