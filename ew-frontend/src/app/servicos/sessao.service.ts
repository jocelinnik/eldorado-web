import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';

@Injectable({
	providedIn: 'root'
})
export class SessaoService {
	
	constructor() {}

	public criarSessao(usuario: Usuario){
		window.localStorage.setItem("usuario", JSON.stringify(usuario));
	}
	
	public pegarSessao() {
		return JSON.parse(window.localStorage.getItem("usuario"));
	}

	public atualizarSessao(usuario: Usuario){
		window.localStorage.setItem("usuario", JSON.stringify(usuario));
	}

	public destruirSessao(){
		window.localStorage.removeItem("usuario");
		window.localStorage.clear();
	}
}