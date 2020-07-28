import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AlertaService {
	
	constructor() { }
	
	alerta(mensagem: string){
		window.alert(mensagem);
	}

	confirmacao(mensagem: string): boolean{
		return window.confirm(mensagem);
	}
}