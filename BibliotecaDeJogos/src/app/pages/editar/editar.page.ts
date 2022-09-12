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

  excluir(jogo : Jogo){
    this._router.navigateByUrl("/excluir",{state:{obj:jogo}})
  }
  alterar(jogo : Jogo){
    this._router.navigateByUrl("/alterar",{state:{obj:jogo}})
  }

}
