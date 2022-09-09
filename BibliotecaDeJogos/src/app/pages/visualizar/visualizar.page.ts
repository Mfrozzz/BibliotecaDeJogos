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

  constructor(private _jogoService: JogoService) {
    this.jogos = this._jogoService.jogos;
   }

  ngOnInit() {
  }
}
