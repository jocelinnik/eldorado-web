import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { Usuario } from "../modelos/usuario";

const opcoesHttp = {
	headers: new HttpHeaders({
		"Content-Type": "application/json"
	})	
};
const apiUrl = "http://localhost:3000/api/usuario";

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	
	constructor(private http: HttpClient) { }

	public async buscarUsuario(email: string){
		const url = `${apiUrl}/${email}`;
		const resultado = await this.http.get(url).toPromise();

		return resultado;
	}

	public async criarUsuario(usuario: Usuario){
		const resultado = await this.http.post(apiUrl, usuario, opcoesHttp).toPromise();

		return resultado;
	}

	public editarUsuario(usuario: Usuario){
		const url = `${apiUrl}/${usuario.id}`;
		const resultado = this.http.put(url, usuario, opcoesHttp).toPromise();

		return resultado;
	}

	public deletarUsuario(id: number){
		const url = `${apiUrl}/${id}`;
		const resultado = this.http.delete<Usuario>(url, opcoesHttp).toPromise();

		return resultado;
	}
}