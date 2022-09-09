import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Jogo } from 'src/app/model/jogo';
import { JogoService } from 'src/app/services/jogo.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  jogos: Jogo[];
  jogo: Jogo;

  constructor(private _jogoService: JogoService,private alertController: AlertController,private _router: Router) {
    this.jogos = this._jogoService.jogos;
   }

  ngOnInit() {
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
      this._router.navigate(["/folder/folder"]);
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
          handler: ()=>{}
        },{
          text:'Confimar',
          handler: ()=>{this.excluirJogo()}
        }
      ],
    });

    await alert.present();
  }

}
