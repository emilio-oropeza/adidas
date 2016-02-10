function jugador(n, o, i){
	this.jugador = n;
	this.origen = o;
	this.pos_jugador = 0;
	this.pos_origen = 0;
	this.img = i;
	this.valido = function(nombre, origen){
		if(this.jugador === nombre & this.origen === origen){
			return true;
		}else{
			return false;
		}
	}
	this.getNombre = function(){
		return this.jugador;
	}
	this.getOrigen = function(){
		return this.origen;
	}
	this.setPosJ = function(pos){
		this.pos_jugador = pos;
	}
	this.getPosJ = function(){
		return this.pos_jugador;
	}
	this.setPosO = function(pos){
		this.pos_origen = pos;
	}
	this.getPosO = function(){
		return this.pos_origen;
	}
	this.getImg = function(){
		return this.img;
	}
}
var j1 = new jugador("James Rodríguez","Envigado Fútbol Club (2006)","james");
var j2 = new jugador("Ivan Rakitic","FC Basel (2005)","rakitik");
var j3 = new jugador("Oscar","São Paulo F. C. (2008)","oscar");
var j4 = new jugador("Manuel Neuer","Schalke 04 (2005)","neuer");
var j5 = new jugador("Mesut Özil","Schalke 04 (2006)","ozil");
var j6 = new jugador("Xavi","FC Barcelona (1998)","xabi");
var j7 = new jugador("Andrés Iniesta","FC Barcelona B (2001)","iniesta");
var jugadores = [j1,j2,j3,j4,j5,j6,j7];