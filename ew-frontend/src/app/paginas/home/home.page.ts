import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { PerfilPage } from '../perfil/perfil.page';
import { Usuario } from '../../modelos/usuario';
import { SessaoService } from '../../servicos/sessao.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
	usuario: Usuario;
	configuracoes: any;
	
	constructor(
		private sessao: SessaoService,
		private modalCtrl: ModalController,
		private navCtrl: NavController
	) {}

	ngOnInit() {
		if (this.sessao.pegarSessao() === null) {
			this.navCtrl.navigateForward("/entrar");
		} else {
			this.usuario = this.sessao.pegarSessao();
			this.configuracoes = {
				modalAberto: false
			}
		}
	}

	async verPerfil(){
		const modal = await this.modalCtrl.create({
			component: PerfilPage,
			animated: true
		});

		await modal.present();
		await modal.onDidDismiss();
		this.usuario = this.sessao.pegarSessao();
	}
 
	sair(){
		this.sessao.destruirSessao();
		this.usuario = null;
		this.navCtrl.navigateForward("/entrar");
	}
}