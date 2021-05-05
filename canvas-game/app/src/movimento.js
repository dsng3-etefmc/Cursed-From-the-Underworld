var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d')

var passo1 = document.getElementById("passo1");
var passo2 = document.getElementById("passo2");

window.addEventListener('keydown', function(event){
    tecla = event.key
})

function movimento (x, y, dx, dy){

    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;

        this.draw = function(){
            c.drawImage(passo1, this.x, this.y);
        }

        this.update = function(){

        if((tecla == 'w') || (tecla == 'W')){
                this.y = this.y - this.dy;

            tecla = '';
        }

        if((tecla == 'd') || (tecla == 'D')){
            this.x = this.x + this.dx;
            
            tecla = '';
        }

        if((tecla == 'a') || (tecla == 'A')){
            this.x = this.x - this.dx;
        
            tecla = '';
        }

        if((tecla == 's') || (tecla == 'S')){
            this.y = this.y + this.dy;
        
            tecla = '';
        }
            
        
        this.draw();
    }
}

var player1 = new movimento(100, 200, 10,10);

function animate (){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    player1.update();
}

 animate();