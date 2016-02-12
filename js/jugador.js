function jugador(n, nm, o, om, i, i2){
	this.nombre = n;
	this.nombreMovil = nm;
	this.origen = o;
	this.origenMovil = om;
	this.pos_jugador = 0;
	this.pos_origen = 0;
	this.img = i;
	this.imgo = i2;
	this.valido = function(nombre, origen){
		if(this.nombre === nombre & this.origen === origen){
			return true;
		}else{
			return false;
		}
	}
}
var j1 = new jugador("James Rodríguez","James","Envigado F. C. (2006)","(2006)","james","envigado");
var j2 = new jugador("Ivan Rakitic","Rakitic","FC Basel (2005)","(2005)","rakitik","basel");
var j3 = new jugador("Oscar","Oscar","São Paulo F. C. (2008)","(2008)","oscar","spbra");
var j4 = new jugador("Manuel Neuer","Neuer","Schalke 04 (2005)","(2005)","neuer","shalke");
var j5 = new jugador("Mesut Özil","Özil","Schalke 04 (2006)","(2006)","ozil","shalke");
var j6 = new jugador("Xavi","Xavi","FC Barcelona (1998)","(1998)","xabi","barca");
var j7 = new jugador("Andrés Iniesta","Iniesta","FC Barcelona B (2001)","(2001)","iniesta","barca");
var jugadores = [j1,j2,j3,j4,j5,j6,j7];