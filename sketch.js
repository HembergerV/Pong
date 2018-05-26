var cambioX = true;
var cambioY = true;

var barra = {   //propiedades de la barra
    altura : 50,
    ancho : 16,
    posicion_barra : 0,
    y : 150,
    vel : 0
};

var barra_bad = {
    altura : 50,
    ancho : 16,
    posicion_barra : 150,
    incY : 0
};


var circle = {  //propiedades del circulo
    diameter : 32, //recomendablemente debe ser un número par
    posX : 200,
    posY : 0,
    vel : 2, // velocidad
    incX : 0,
    incY : 0    //incremento
};

var cuad = {
    alto : 20,
    ancho : 90,
    izq : 0,
    der : 0,
    sup : 0,
    inf : 0
};

var cont = 0;
var song;
var slider;
var puntajeA = 0; //del jugador
var puntajeB = 0; //del enemigo

function preload() {
    song = loadSound('drum-hitfinish.wav');
}

function setup() {
    createCanvas (400,300);
    //* slider = createSlider(0,1,0.5,0.01);
    circle.posY = random(30,270);
    //circle.posY = 150;
}

function draw() {
    clear();
    
    //* song.setVolume(slider.value());
    background(0);
    
    textSize(40);   //puntajes
    fill(150,100,150);
    text(puntajeA,width/2-40,40);
    fill(200,100,100);
    text(puntajeB,width/2+20,40);
    
    //barra de medio
    fill (255);
    rect (width/2 - 7.5,0,15,400);
    
    /////////////////Botón/////////////////////////
    cuad.izq = width /2 - cuad.ancho / 2;
    cuad.der = width /2 + cuad.ancho / 2;
    cuad.sup = height  - cuad.alto;
    cuad.inf = height;
    
    textSize(20);
    fill(250,200,100,200);
    rect(cuad.izq, cuad.sup,cuad.ancho,cuad.alto,255);
    fill (200,0,120,200);
    text ("Continue",width / 2 -40,height-3,150);   //reinicio
    fill(255);
    //////////////////Botón///////////////////////
    
    //pelota que se moverá
    ellipse (circle.posX,circle.posY,circle.diameter,circle.diameter);
    noStroke();
    
    //////////////////////barra enemiga/////////////////////////
    if (circle.posX < width / 2+20){
        if (barra_bad.posicion_barra + 5 > circle.posY){
            barra_bad.posicion_barra -= 2 + barra_bad.incY;
        } else if (barra_bad.posicion_barra + 45 < circle.posY){
            barra_bad.posicion_barra += 2 + barra_bad.incY;
        }
    }
    rect (0,barra_bad.posicion_barra + 8, barra_bad.ancho, barra_bad.altura);
    /////////////////////////////////////////////////////////////
    
    
    //barra golpeadora
    barra.posicion_barra = barra.y - barra.altura/2;
    rect(width - barra.ancho,barra.posicion_barra ,barra.ancho,barra.altura);
    
    //////////////////////////Mov barra////////////////////////////
    if(keyIsDown(UP_ARROW)) {
        barra.y -= barra.vel;
        if (barra.vel < 3){
            barra.vel += 1;
        }
    }
    else if(key == "&"){
        if (barra.vel > 0){
            barra.vel -= 0.3;
            barra.y -= barra.vel;
        }
        
    }
    
    if(keyIsDown(DOWN_ARROW)) {
        barra.y += barra.vel;
        if (barra.vel < 3){
            barra.vel += 1;
        }
    }
    else if(key == "("){
        if (barra.vel > 0){
            barra.vel -= 0.3;
            barra.y += barra.vel;
        }
    }
    /////////////////////////Mov barra//////////////////////////////
    
    //posicion X//////Lado enemigo
    if (circle.posX < 0 + circle.diameter / 2 + barra_bad.ancho / 2){
        if (circle.posY > barra_bad.posicion_barra && circle.posY <   barra_bad.posicion_barra + barra_bad.altura){
            song.play();
            cambioX = true;
            circle.incX += 0.2; 
            if (barra_bad.incY < 4.5) {
                barra_bad.incY += 0.2;
            }
        }
        else {
            cambioX = true;
            puntajeB += 1;
            circle.posX = undefined;
            
        }
        //cada choque aumentará la velocidad
    }
    
    ///Posicion X/////Lado aliado//////////////////
  if (circle.posX > width - circle.diameter / 2 - barra.ancho / 2) {
        if (circle.posY > barra.posicion_barra && circle.posY < barra.posicion_barra + barra.altura){ //si circulo está abajo de la esquina superior izquierda de la barra Y si circulo está arriba de la esquina inferior izquierda de la barra, rebota 
            cambioX = false;
            song.play();
            circle.incX += 0.2;
            cont += 1;
        }
        else {
            cambioX = false;
            puntajeA += 1;
            circle.posX = undefined;
        }
    
    }
    
    if (cambioX) {
        circle.posX += (circle.vel + circle.incX);
        fill (150,100,150);
        rect(20,20,20,20);
    }
    else {
        circle.posX -= (circle.vel + circle.incX);
        fill (200,100,100);
        ellipse(30,30,20,20);
    }
    
    //posicionY
    if (circle.posY < circle.diameter / 2){
        cambioY = true;
        circle.incY += 0.1; 
    }
    else if (circle.posY > height - circle.diameter / 2) {
        cambioY = false;
        circle.incY += 0.1; 
    }
    
    if (cambioY) {
        circle.posY += (1 + circle.incY);
    }
    else {
        circle.posY -= (1 + circle.incY);
    }
    
    //////////Determinar el ganador//////////////////////////
    if (puntajeA == 3){
        textSize(40);
        fill (150,100,150);
        text("You Losser", width / 2 - 95, height / 2 + 15);
    } else if (puntajeB == 3){
        textSize(40);
        fill (200,100,100);
        text("You Win", width / 2 - 80, height / 2 + 15);
        }
    /////////////////////////////////////////////////////////
}

function mousePressed() {
    if (mouseX >= cuad.izq &&  mouseX <= cuad.der && mouseY >= cuad.sup && mouseY <= cuad.inf){
        circle.posY = random(30,270);
        circle.incX = 0;
        circle.incY = 0;
        circle.posX = width / 2;
        barra_bad.posicion_barra = height / 2 - barra_bad.altura / 2 ;
        barra.y = height / 2 ;
    }

}