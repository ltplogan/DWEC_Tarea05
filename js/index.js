
const tabla = document.createElement("DIV");
const element = document.createElement("DIV"); 
const contenedor = document.createElement("DIV");	
contenedor.className = "flex-container";	

tabla.className = "casilla";
tabla.style.backgroundImage = 'url("ufo.jpg")' ;

element.className = "estilo"; 
let btn = document.createElement('button');
btn.innerHTML = 'iniciar';
btn.className = "estiloBtn";
contenedor.appendChild(btn);
let stop = document.createElement('button');
stop.innerHTML = 'stop';
stop.className = "estiloBtn";
contenedor.appendChild(stop);

let controlVelocidad = document.createElement("input");
	controlVelocidad.setAttribute("type", "number");
	controlVelocidad.setAttribute("value",1);
	controlVelocidad.setAttribute("min",1);
	controlVelocidad.setAttribute("max",5);
	controlVelocidad.setAttribute("id", "cambioVelocidad");
	contenedor.appendChild(controlVelocidad);

let radiohorizontal = document.createElement('input');
    radiohorizontal.setAttribute('type', 'radio');
	radiohorizontal.setAttribute('name', 'propiedad');
    radiohorizontal.setAttribute('id', 'opcion1');
    radiohorizontal.setAttribute('value', 'horizontal');
    //radiohorizontal.value = 'horizontal';
    //radiohorizontal.setAttribute("onclick", "opPintado(this.value)");
   
let radiovertical = document.createElement('input');
    radiovertical.setAttribute('type', 'radio');
	radiovertical.setAttribute('name', 'propiedad');
    radiovertical.setAttribute('id', 'opcion2');
    radiovertical.setAttribute('value', 'vertical');
    //radiovertical.setAttribute("onclick", "opPintado(this.value)");
	
let labelhorizontal = document.createTextNode('Horizontal');
let labelvertical = document.createTextNode('Vertical');
let saltolinea = document.createElement('br');
	contenedor.appendChild(radiohorizontal);
    contenedor.appendChild(labelhorizontal);
    contenedor.appendChild(radiovertical);
    contenedor.appendChild(labelvertical);
	
tabla.appendChild(element);
document.body.appendChild(tabla);

let w;
let h;
let width;
let height;
let posX = 0;
let posY = 0;
let speed = 1;
let requestId;
let music;

document.body.appendChild(contenedor);

window.onload = function init() {
	w = tabla.clientWidth;
    h = tabla.clientHeight;
    width = element.clientWidth;
    height = element.clientHeight;
	
	btn.addEventListener("click", start);
	stop.addEventListener("click", stopFrame)
}
function displayRadioValue() {
	var elementRadio = document.getElementsByName('propiedad');
              
    for(i = 0; i < elementRadio.length; i++) {
      //if(ele[i].checked)
        //document.getElementById("result").innerHTML = "Propiedad: "+ele[i].value;
        elementRadio[i].onclick = function(e) {
        if(e.ctrlKey) {
          this.checked = false;
        }
      }
    }
}
function start() {
	music = new sound("chesney.mp3");
	if(document.getElementById("opcion1").checked) {
    	myMoveX();	
		music.play();
	}	
    if(document.getElementById("opcion2").checked) {
    	//alert("opción 2");
       myMoveY();
	   music.play();
	}  	
}
'use strict';
document.addEventListener('keydown', (event) => {
	start();
	music.play();
	const keyName = event.key;
	if(keyName == 'h') {
		myMoveX();	
	}
	if(keyName == 'v') {
		myMoveY();	
	}
});
function speedCuadrado() {
	var speedX = document.getElementById("cambioVelocidad").value;
	return parseInt(speedX);
}
function myMoveX() {
	translateCuadradoX();
	moverCuadradoX();
	
	requestId = requestAnimationFrame(myMoveX);
}
function myMoveY() {
	translateCuadradoY();
	moverCuadradoY();
	
	requestId = requestAnimationFrame(myMoveY);
}
function moverCuadradoX() {
	
	posX += speedCuadrado();
 
	moverX();
}
function moverCuadradoY() {
	
	posY += speedCuadrado();
 
	moverY();
}
function moverX() {
	
  if((posX + width) > w) {
    posX = 0;
    posY += height;
  }
  if((posY + height) > h) {
    posX = 0;
    posY = 0;
  }
}
function moverY() {
  if((posY + height) > h) {
    posY = 0;
    posX += width;
  }
  if((posX + width) > w) {
    posX = 0;
    posY = 0;
  }
}
function translateCuadradoX() {
	element.style.left = posX + "px";
	element.style.top = posY + "px";
}
function translateCuadradoY() {
	element.style.top = posY + "px";
	element.style.left = posX + "px";
}
function stopFrame() {
	//alert("prueba");
	if (requestId) {
		cancelAnimationFrame(requestId);

		posX = 0;
		posY = 0;
		
		music.stop();
		
		return;
	}
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}
