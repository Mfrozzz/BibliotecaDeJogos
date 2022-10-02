import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Jogo } from 'src/app/model/jogo';
import { JogoFBServiceService } from 'src/app/services/jogo-fbservice.service';
import { JogoService } from 'src/app/services/jogo.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  jogos: Jogo[];
  jogo: Jogo;

  constructor(private _jogoService: JogoFBServiceService,private alertController: AlertController,private _router: Router) {
    this.carregar();
  }

  ngOnInit() {
  }

  carregar(){
    this._jogoService.getJogos().subscribe(res=>{
      this.jogos = res.map(e =>{
        return{
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Jogo
        }as Jogo;
      });
    });
  }

  excluir(jogo : Jogo){
    this._router.navigateByUrl("/excluir",{state:{obj:jogo}});
  }
  alterar(jogo : Jogo){
    this._router.navigateByUrl("/alterar",{state:{obj:jogo}});
  }

}
