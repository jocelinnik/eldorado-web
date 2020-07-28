import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';

import { Usuario } from "../../modelos/usuario";
import { AlertaService } from "../../servicos/alerta.service";
import { ApiService } from '../../servicos/api.service';
import { SessaoService } from '../../servicos/sessao.service';
import { ValidadorService } from '../../servicos/validador.service';

@Component({
	selector: 'app-entrar',
	templateUrl: './entrar.page.html',
	styleUrls: ['./entrar.page.scss'],
})
export class EntrarPage implements OnInit {
	@ViewChild(IonSlides) slides: IonSlides;
	usuarioLocal: Usuario;
	usuarioBanco: any;
	validacoes: any;
	configuracoes: any;
	
	constructor(
		private alerta: AlertaService,
		private validador: ValidadorService, 
		private api: ApiService,
		private sessao: SessaoService,
		private navCtrl: NavController
	) {}
	
	ngOnInit() {
		this.usuarioLocal = new Usuario();
		this.usuarioBanco = null;
		this.validacoes = {
			emailValidado: true,
			emailCorreto: true,
			senhaValidada: true,
			senhaCorreta: true
		};
		this.configuracoes = {
			verSenha: {
				bol: false,
				campo: "password",
				icone: "eye-off"
			}
		}
	}
	
	mudarSegmento(event: any) {
		if (event.detail.value === 'login') {
			this.slides.slidePrev();
		} else {
			this.slides.slideNext();
		}
	}

	verSenha() {
		this.configuracoes.verSenha.bol = !this.configuracoes.verSenha.bol;
		this.configuracoes.verSenha.campo = (this.configuracoes.verSenha.bol) ? "text" : "password";
		this.configuracoes.verSenha.icone = (this.configuracoes.verSenha.bol) ? "eye" : "eye-off";
	}

	async cadastrar() {
		this.validacoes.emailValidado = this.validador.validarEmail(this.usuarioLocal.email);
		this.validacoes.senhaValidada = this.validador.validarSenha(this.usuarioLocal.senha);
		
		if (this.validacoes.emailValidado && this.validacoes.senhaValidada) {
			let emailUsado = this.api.buscarUsuario(this.usuarioLocal.email);
			await emailUsado.then(resolvido => {
				this.alerta.alerta("Este email já ta sendo usado, tente outro");
			}).catch(async erro => {
				if (erro.status === 404){
					let resultado = this.api.criarUsuario(this.usuarioLocal);
					await resultado.then(resolvido => {
						this.usuarioBanco = resolvido;
						this.usuarioLocal.email = "";
						this.usuarioLocal.senha = "";
						this.alerta.alerta("Cadastro realizado com sucesso");
						this.slides.slidePrev();
					});
				}else{
					this.alerta.alerta("Um erro inesperado ocorreu. Tente novamente mais tarde");
				}
			});
		}
	}

	async entrar() {
		this.validacoes.emailValidado = this.validador.validarEmail(this.usuarioLocal.email);
		this.validacoes.senhaValidada = this.validador.validarSenha(this.usuarioLocal.senha);

		if(this.validacoes.emailValidado && this.validacoes.senhaValidada){
			if(this.usuarioBanco===null){
				let resultado = this.api.buscarUsuario(this.usuarioLocal.email);
				await resultado
				.then(resolvido => {
					this.usuarioBanco = resolvido;
				})
				.catch(erro => {
					this.alerta.alerta("Um erro inesperado ocorreu. Tente novamente mais tarde");
				});
			}

			this.validacoes.emailCorreto, this.validacoes.senhaCorreta = this.validador.validarLogin(this.usuarioLocal, this.usuarioBanco);
			if (this.validacoes.emailCorreto && this.validacoes.senhaCorreta) {
				this.usuarioLocal.id = this.usuarioBanco.id;
				this.usuarioLocal.nome = this.usuarioBanco.nome;
				this.sessao.criarSessao(this.usuarioLocal);
				this.usuarioLocal = new Usuario();
				this.usuarioBanco = null;
				this.navCtrl.navigateForward("/home");
			}
		}
	}
}