import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Jogo } from 'src/app/model/jogo';
import { JogoService } from 'src/app/services/jogo.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.page.html',
  styleUrls: ['./excluir.page.scss'],
})
export class ExcluirPage implements OnInit {
  jogo: Jogo;

  constructor(private alertController: AlertController,private _router: Router, private _jogoService: JogoService) { }

  ngOnInit() {
    const nav = this._router.getCurrentNavigation();
    this.jogo = nav.extras.state.obj;
    this.excluir();
  }

  async presentAlert(cabecalho : string, subcabecalho : string,msg: string) {
    const alert = await this.alertController.create({
      header: cabecalho,
      subHeader: subcabecalho,
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  excluir():void{
    this.presentAlertConfirm("Biblioteca de Jogos","Excluir jogo","Você deseja excluir esse jogo?");
  }
  private excluirJogo(): void{
    if(this._jogoService.excluir(this.jogo)){
      this.presentAlert("Biblioteca de Jogos","Sucesso","Jogo excluido");
      this._router.navigate(["/visualizar"]);
    }else{
      this.presentAlert("Biblioteca de Jogos","Erro","Jogo não encontrado");
    }
  }
// no trab outro arquivo.
  async presentAlertConfirm(cabecalho : string, subcabecalho : string,msg: string) {
    const alert = await this.alertController.create({
      header: cabecalho,
      subHeader: subcabecalho,
      message: msg,
      buttons: [
        {
          text:'Cancelar',
          role:'cancelar',
          cssClass:'secondary',
          handler: ()=>{this._router.navigate(["/editar"])}
        },{
          text:'Confimar',
          handler: ()=>{this.excluirJogo()}
        }
      ],
    });

    await alert.present();
  }

  onClick(){
    this._router.navigate(["/editar"]);
  }

}
