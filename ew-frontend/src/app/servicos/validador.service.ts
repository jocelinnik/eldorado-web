import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';

@Injectable({
	providedIn: 'root'
})
export class ValidadorService {
	
	constructor() { }

	validarEmail(email): boolean{
		let regex = new RegExp(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})*$/);

		if(regex.test(email)) return true;
		else return false;
	}

	validarSenha(senha){
		let regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{6,}$/);

		if(regex.test(senha)) return true;
		else return false;
	}

	validarLogin(usuarioTela, usuarioServidor){
		return usuarioTela.email===usuarioServidor.email, usuarioTela.senha===usuarioServidor.senha;
	}
}