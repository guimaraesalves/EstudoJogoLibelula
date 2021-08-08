let diryJ, dirxJ, jog, velJ, velT, pjx, pjy;
let tamTelaW, tamTelaH;
let jogo;
let frames;
let contBombas, painelContBombas, velB, tmpCriaBomba;
let bombasTotal;
let vidaPlaneta, barraPlaneta;
let indExpl, isom;
let telaMsg;

function teclaDw() {
    let tecla = event.keyCode;
    if (tecla == 38){ //Cima
        diryJ =-1;
    } else if (tecla == 40){ //Baixo
        diryJ =1;
    } else if (tecla == 37){ //Esquerda
        dirxJ =- 1;
    } else if (tecla == 39){ //Direita
        dirxJ =1;
    }
    if(tecla ==  32){ //Espaço / Tiro
        //TIRO
        atira(pjx+91, pjy);
    }


}



//liberar as teclas
function teclaUp(){
    let tecla = event.keyCode;
    if((tecla == 38) || (tecla == 40)){ //Cima ou Baixo
        diryJ=0;
    }
    if((tecla == 37) || (tecla == 39)){ //Esq ou Dir
        dirxJ=0;
    }
}


function criaBomba(){
    if (jogo){
        let y=0;
        let x=Math.random()*tamTelaW;
        let bomba = document.createElement("div");
        let att1 = document.createAttribute("class");
        let att2 = document.createAttribute("style");
        att1.value = "bomba";
        att2.value = "top:" + y + "px;left:" + x + "px;";
        bomba.setAttributeNode(att1);
        bomba.setAttributeNode(att2);
        document.body.appendChild(bomba);
        contBombas--;
    }
} 


function controlaBomba(){
    bombasTotal = document.getElementsByClassName("bomba");
    let tam = bombasTotal.length;

    for(let i = 0; i < tam; i++) {
        if (bombasTotal[i]){
            let pi = bombasTotal[i].offsetTop;
            pi += velB;
            bombasTotal[i].style.top = pi + "px";
            if (pi > tamTelaH){
                vidaPlaneta -= 10;
                criaExplosao(2, bombasTotal[i].offsetLeft, null);
                bombasTotal[i].remove();

            }

        }
    }
}


function atira(x, y){
    let t = document.createElement("div");
    let att1 = document.createAttribute("class");
    let att2 = document.createAttribute("style");
    att1.value = "tiroJog";
    att2.value = "top:" + y + "px;left:" + x + "px";
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    document.body.appendChild(t);
}


function controleTiros(){
    let tiros = document.getElementsByClassName("tiroJog");
    let tam = tiros.length;
    for (let i = 0; i < tam; i++){
        if(tiros[i]){
            let pt = tiros[i].offsetTop;
            pt -= velT;
            tiros[i].style.top = pt + "px";
            colisaoTiroBomba(tiros[i])
            if( pt < 0){
                document.body.removeChild(tiros[i]);
                //tiros[i].remove();
            }
        }
    }
}

// Parte do código para o labirinto.
function colisaoTiroBomba(tiro){
    let tam = bombasTotal.length;
    for (let i = 0; i < tam; i++) {
        if (bombasTotal[i]){
            if (
                (
                    //Cima tiro com baixo bomba
                    (tiro.offsetTop <= (bombasTotal[i].offsetTop + 47)) 
                    && 
                    //Baixo tiro com cima bomba
                    ((tiro.offsetTop+6) >= (bombasTotal[i].offsetTop))
                )
                &&
                ( 
                    (tiro.offsetLeft <= (bombasTotal[i].offsetLeft+ 66)) //Esquerda tiro com direita bomba
                    && 
                    ((tiro.offsetLeft + 6) >= (bombasTotal[i].offsetLeft)) //Direita Tiro com esquerda bomba
                )
            ) {

                criaExplosao(1, bombasTotal[i].offsetLeft - 30, bombasTotal[i].offsetTop);
                bombasTotal[i].remove();
                tiro.remove();

            }          
               
        }
    }
}

function criaExplosao(tipo, x, y){ // Tipo 1 = Ar, 2 = Terra;


    if (document.getElementById("explosao" + (indExpl - 1))){
        document.getElementById("explosao" + (indExpl - 1)).remove();
    }





    let explosao = document.createElement("div");
    let img = document.createElement("img");
    let som = document.createElement("audio");
    //Atributos para div
    let att1 = document.createAttribute("class");
    let att2 = document.createAttribute("style");
    let att3 = document.createAttribute("id");
    //Atributo para img
    let att4 = document.createAttribute("src");
    //Atributo para audio
    let att5 = document.createAttribute("src");
    let att6 = document.createAttribute("id");

    att3.value = "explosao" + indExpl;
    if(tipo == 1){
        att1.value = "explosaoChao";
        att2.value = "top:" + y +"px;left:" + x + "px;";
        att4.value = "explArFlorPeq.gif?" + new Date();
        att5.value = "gota1.wav";
        att6.value = "som" + isom;
    } else {
        att1.value = "explosaoAr";
        att2.value = "top:" + (tamTelaH - 47) +"px;left:" + (x - 33) + "px;";
        att4.value = "explosaoChaoPeq.gif?" + new Date();
        att5.value = "explosao3.wav";
        att6.value = "som" + isom;
    }

    

    explosao.setAttributeNode(att1);
    explosao.setAttributeNode(att2);
    explosao.setAttributeNode(att3);

    img.setAttributeNode(att4);
    som.setAttributeNode(att5);
    som.setAttributeNode(att6);

    explosao.appendChild(img);
    explosao.appendChild(som);

    document.body.appendChild(explosao);

    //Dar o play no som;
    document.getElementById("som" + isom).play();

    indExpl ++;
    isom ++;

}



function controlaJogador(){
    pjy += diryJ * velJ;
    pjx += dirxJ * velJ;
    jog.style.top = pjy + "px";
    jog.style.left = pjx + "px";

}



function gerenciaGame(){
    barraPlaneta.style.width = vidaPlaneta + "px";

    if (contBombas <= 0) {
        jogo = false;
        clearInterval(tmpCriaBomba);
        telaMsg.style.backgroundImage = "url('telaVitoria.png')";
        telaMsg.style.display = "block";
    }
    if(vidaPlaneta <= 0) {
        jogo = false;
        clearInterval(tmpCriaBomba);
        telaMsg.style.backgroundImage = "url('telaDerrota.png')";
        telaMsg.style.display = "block";
    }
}



function gameLoop(){
    if(jogo){
        //Funções de Controle;
        controlaJogador();
        controleTiros();
        controlaBomba();       
    }
    gerenciaGame();   
    frames = requestAnimationFrame(gameLoop);

}

function reinicia(){
    bombasTotal = document.getElementsByClassName("bomba");
    let tam = bombasTotal.length;
    for (let i = 0; i  < tam; i++){
        if(bombasTotal[i]){
            bombasTotal[i].remove()
        }
    }
    telaMsg.style.display = "none";
    clearInterval(tmpCriaBomba);
    cancelAnimationFrame(frames);
    vidaPlaneta = 300;
    pjx = tamTelaW/2.5;
    pjy = tamTelaH/2;  
    jog.style.top = pjy + "px";
    jog.style.left = pjx + "px";
    contBombas = 60;
    jogo = true;
    tmpCriaBomba = setInterval(criaBomba, 1700);
    gameLoop()
}



function inicia(){
    jogo = false;

// Ini Tela
tamTelaH = window.innerHeight;
tamTelaW = window.innerWidth;


// inicialização jogador;
dirxJ=diryJ=0; 
pjx = tamTelaW/2.5;
pjy = tamTelaH/2;  
velJ = 10;
velT = 5; 
jog = document.getElementById("naveJog");
jog.style.top = pjy + "px";
jog.style.left = pjx + "px";

//Controles das bombas

contBombas = 50;
velB = 3;


//Controle do Planeta (Jardim);
vidaPlaneta = 300;
barraPlaneta = document.getElementById("barraPlaneta");
barraPlaneta.style.width = vidaPlaneta + "px";

//Controle de Explosão;
indExpl = isom = 0;


//Telas
telaMsg = document.getElementById("telaMsg");
telaMsg.style.backgroundImage = "url('telainiciar.png')";
telaMsg.style.display = "block";
document.getElementById("btnJogar").addEventListener("click",reinicia);
}

window.addEventListener("load", inicia);
document.addEventListener("keydown", teclaDw);
document.addEventListener("keyup", teclaUp);