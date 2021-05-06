const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d')

const passo1 = document.getElementById("passo1");
const passo2 = document.getElementById("passo2");
const som = document.getElementById("som");

/**
 * Classe do jogador
 */
class Player {

    constructor (x, y, dx, dy) {
        this.x=x;
        this.y=y;
        this.dx=dx;
        this.dy=dy;

        window.addEventListener('keydown', (event) => this.update(event.key))
    }

    draw () {
        ctx.drawImage(passo1, this.x, this.y);
    }

    update (tecla) {

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


// Lógica principal ----------------------------------------

const player1 = new Player(100, 200, 10,10);

function init () {
    animate();
}

function animate (){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    player1.update();
}

init();