import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { Usuario } from '../../modelos/usuario';
import { ValidadorService } from '../../servicos/validador.service';
import { ApiService } from '../../servicos/api.service';
import { SessaoService } from '../../servicos/sessao.service';
import { AlertaService } from '../../servicos/alerta.service';

@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.page.html',
	styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
	usuario: Usuario;
	sessaoUsuario: any;
	validacoes: any;
	configuracoes: any;

	constructor(
		private validador: ValidadorService,
		private alerta: AlertaService,
		private api: ApiService,
		private sessao: SessaoService,
		private modalCtrl: ModalController,
		private navCtrl: NavController
	) {}
	
	ngOnInit() {
		this.usuario = this.sessao.pegarSessao();
		this.validacoes = {
			emailValidado: true,
			senhaValidada: true
		};
		this.configuracoes = {
			verSenha: {
				bol: false,
				campo: "password",
				icone: "eye-off"
			},
			editar: false
		}
	}

	fecharVerPerfil() {
		this.modalCtrl.dismiss();
	}

	verSenha(){
		this.configuracoes.verSenha.bol = !this.configuracoes.verSenha.bol;
		this.configuracoes.verSenha.campo = (this.configuracoes.verSenha.bol) ? "text" : "password";
		this.configuracoes.verSenha.icone = (this.configuracoes.verSenha.bol) ? "eye" : "eye-off";
	}
	
	habilitarCancelarEdicao(){
		this.configuracoes.habilitar = !this.configuracoes.habilitar;
		this.configuracoes.editar = !this.configuracoes.editar;
	}

	async editar(){
		this.validacoes.emailValidado = this.validador.validarEmail(this.usuario.email);
		this.validacoes.senhaValidada = this.validador.validarSenha(this.usuario.senha);

		if (this.validacoes.emailValidado && this.validacoes.senhaValidada){
			this.sessaoUsuario = this.sessao.pegarSessao();
			let emailUsado = this.api.buscarUsuario(this.usuario.email);
			await emailUsado.then(async resolvido => {
				if(this.usuario.email!==this.sessaoUsuario.email){
					this.alerta.alerta("Este email já ta sendo usado, tente outro");
				}else{
					let resultado = this.api.editarUsuario(this.usuario);
					await resultado.then(resolvido => {
						this.sessao.atualizarSessao(this.usuario);
						this.alerta.alerta("Atualização realizada com sucesso");
						this.modalCtrl.dismiss();
					});
				}
			}).catch(async erro => {
				if (erro.status === 404) {
					let resultado = this.api.editarUsuario(this.usuario);
					await resultado.then(resolvido => {
						this.sessao.atualizarSessao(this.usuario);
						this.alerta.alerta("Atualização realizada com sucesso");
						this.modalCtrl.dismiss();
					});
				} else {
					this.alerta.alerta("Um erro inesperado ocorreu. Tente novamente mais tarde");
				}
			});
		}
	} 

	deletar(){
		let mensagem = "Deseja realmente deletar o seu perfil?";

		if(this.alerta.confirmacao(mensagem)){
			let resultado = this.api.deletarUsuario(this.usuario.id);
			resultado.then(resolvido => {
				this.sessao.destruirSessao();
				this.modalCtrl.dismiss();
				this.navCtrl.navigateForward("/entrar");
			}).catch(erro => {
				this.alerta.alerta("Um erro inesperado ocorreu. Tente novamente mais tarde");
			});
		}
	}
}
