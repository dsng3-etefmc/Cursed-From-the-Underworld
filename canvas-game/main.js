var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d')

var passo1 = document.getElementById("passo1");
var passo2 = document.getElementById("passo2");
var som = document.getElementById("som");

window.addEventListener('keydown', function(event){
    tecla = event.key
})

class movimento {

    constructor (x, y, dx, dy) {
        this.x=x;
        this.y=y;
        this.dx=dx;
        this.dy=dy;
    }

    draw () {
        c.drawImage(passo1, this.x, this.y);
    }

    update () {

        if((tecla == 'w') || (tecla == 'W')){
                this.y = this.y - this.dy;
                som.play()
            tecla = '';
        }

        if((tecla == 'd') || (tecla == 'D')){
            this.x = this.x + this.dx;
            som.play()
            tecla = '';
        }

        if((tecla == 'a') || (tecla == 'A')){
            this.x = this.x - this.dx;
            som.play()
            tecla = '';
        }

        if((tecla == 's') || (tecla == 'S')){
            this.y = this.y + this.dy;
            som.play()
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