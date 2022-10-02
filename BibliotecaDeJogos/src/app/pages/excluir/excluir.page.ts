import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Jogo } from 'src/app/model/jogo';
import { JogoFBServiceService } from 'src/app/services/jogo-fbservice.service';
import { JogoService } from 'src/app/services/jogo.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.page.html',
  styleUrls: ['./excluir.page.scss'],
})
export class ExcluirPage implements OnInit {
  jogo: Jogo;

  constructor(private _loadingCtrl: LoadingController,private alertController: AlertController,private _router: Router, private _jogoService: JogoFBServiceService) { }

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
    this.presentAlertConfirm("GameBox","Excluir jogo","Você deseja excluir esse jogo?");
  }
  private excluirJogo(): void{
    this.showLoading("Excluindo.",1000);
    this._jogoService.excluirJogo(this.jogo).then(()=>{
      this._loadingCtrl.dismiss();
      this.presentAlert("GameBox","Sucesso","Jogo excluido");
      this._router.navigate(["/visualizar"]);
    }).catch((error)=>{
      this._loadingCtrl.dismiss();
      this.presentAlert("GameBox","Erro","Jogo não encontrado");
      console.log(error);
    });
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

  async showLoading(mensagem:string,duracao:number) {
    const loading = await this._loadingCtrl.create({
      message: mensagem,
      duration: duracao,
    });

    loading.present();
  }

}
