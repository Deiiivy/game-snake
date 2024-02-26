let playBoard = document.querySelector('.play-board');
let puntosElemento = document.querySelector('.puntos');
let recordPuntaje = document.querySelector('.record');

let comidaX;
let comidaY;

let culebraX = 5;
let culebraY = 10;

let velocidadX = 0;
let velocidadY = 0;

let culebraTamaño = [];

let gameOver = false;
let setIntervalId;

let puntos = 0;
let puntajeMaximo = localStorage.getItem("record") || 0;
recordPuntaje.innerHTML = `Record: ${puntajeMaximo}`;



let comidaAleatoria  = () => {
    comidaX = Math.floor(Math.random() * 30) + 1;
    comidaY = Math.floor(Math.random() * 30) + 1;
}

const perdiste = () => {
    clearInterval(setIntervalId);
    backgroundSound.pause();
    document.getElementById('losser').play();
    setTimeout(() => {
        alert('Haz perdido');
        document.getElementById('reiniciarJuego').style.display = 'block';
    }, 1000); 
    culebraX = 5;
    culebraY = 10;
    velocidadX = 0;
    velocidadY = 0;
    culebraTamaño = [];
    gameOver = false;
    iniciarGame(); 
};


document.getElementById('reiniciarJuego').addEventListener('click', () => {
    location.reload();
});

let backgroundSound = new Audio('audio/tetrisgameboy1-gameboy.mp3');
backgroundSound.loop = true;
backgroundSound.addEventListener('canplaythrough', function() {
    backgroundSound.play();
});

const iniciarGame = () => {
    if(gameOver) return perdiste(); 
   let html = `<div class = "comida" style= "grid-area: ${comidaY} / ${comidaX}">
    </div>`;    

    

    if(culebraX === comidaX && culebraY === comidaY){
        comidaAleatoria();
        culebraTamaño.push([comidaX,comidaY])
        //console.log(culebraTamaño)
        puntos++;

        puntosElemento.innerHTML = `Puntos: ${puntos}`
        puntajeMaximo = puntos >= puntajeMaximo ? puntos : puntajeMaximo;
        localStorage.setItem("record", puntajeMaximo);

    }


    for(i = culebraTamaño.length -1; i > 0; i--){
        culebraTamaño[i] = culebraTamaño[i - 1]
    }



    culebraTamaño[0] = [culebraX, culebraY];

    culebraX += velocidadX;
    culebraY += velocidadY; 

    if(culebraX <= 0 || culebraX > 30 || culebraY <= 0 || culebraY > 30){
        gameOver = true;       
    }



    for(i = 0; i < culebraTamaño.length; i ++){
        html += `<div class = "culebra" style= "grid-area: ${culebraTamaño[i][1]} / ${culebraTamaño[i][0]}">  </div>`;
        if(i != 0 && culebraTamaño[0][1] === culebraTamaño[i][1] && culebraTamaño[0][0] === culebraTamaño[i][0]){
            gameOver = true;
            
        }
    }
    playBoard.innerHTML = html;  
}


const direccionCulebra = (e) => {
    if(e.key === "ArrowUp" && velocidadY != 1) {
        velocidadX = 0;
        velocidadY = -1;
    }else if(e.key === "ArrowDown" && velocidadY != -1) {
        velocidadX = 0;
        velocidadY = 1;
    }else if(e.key === "ArrowLeft" && velocidadX != 1) {
        velocidadX = -1;
        velocidadY = 0;
    }else if(e.key === "ArrowRight" && velocidadX != -  1){
        velocidadX = 1;
        velocidadY = 0;
    }

}

comidaAleatoria();
setIntervalId = setInterval(iniciarGame, 125)


document.addEventListener("keydown", direccionCulebra)