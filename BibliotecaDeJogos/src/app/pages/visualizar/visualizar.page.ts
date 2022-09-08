import { Component, OnInit } from '@angular/core';
import { Jogo } from 'src/app/model/jogo';
import { JogoService } from 'src/app/services/jogo.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
})
export class VisualizarPage implements OnInit {
  jogos : Jogo[];
  aberto: boolean = false;
  icone: string;

  constructor(private _jogoService: JogoService) {
    this.jogos = this._jogoService.jogos;
    this.icone = "arrow-down";
   }

  ngOnInit() {
  }

  buttonClick(){
    if(this.aberto){
      this.icone = "arrow-down";
      this.aberto = false;
    }else{
      this.aberto = true;
      this.icone = "arrow-up";
    }

  }
}
