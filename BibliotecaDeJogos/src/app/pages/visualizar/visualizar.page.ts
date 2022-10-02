import { Component, OnInit } from '@angular/core';
import { Jogo } from 'src/app/model/jogo';
import { JogoFBServiceService } from 'src/app/services/jogo-fbservice.service';
import { JogoService } from 'src/app/services/jogo.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
})
export class VisualizarPage implements OnInit {
  jogos : Jogo[];

  constructor(private _jogoService: JogoFBServiceService) {
    this.carregarJogos();
   }

   carregarJogos(){
    this._jogoService.getJogos().subscribe(res=>{
      this.jogos = res.map(e=>{
        return{
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Jogo
        }as Jogo;
      });
    });
   }

  ngOnInit() {
  }
}
