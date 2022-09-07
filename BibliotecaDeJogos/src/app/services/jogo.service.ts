import { Injectable } from '@angular/core';
import { Jogo } from '../model/jogo';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  private _jogos: Jogo[] = [];
  
  constructor() {
    //jogo de exemplo falta ano/data
    let game = new Jogo("Hollow Knight","Team Cherry","Pc","MetroidVania",26.60,5);
    this.inserir(game);
  }
  
  public inserir(jogos: Jogo):void{
    this._jogos.push(jogos);
  }
  public get jogos(): Jogo[] {
    return this._jogos;
  }
  
  public excluir(jogos: Jogo):boolean{
    for(let i =0;i<this._jogos.length;i++){
      if((this._jogos[i].id) == (jogos.id)){
        this._jogos.splice(i,1);
        return true;
      }
    }
    return false;
  }
//nome:string,produtora: string,plataforma: string,genero: string,preco: number,avaliacao: number
  public editar(jogo: Jogo, nome : string, produtora: string,plataforma: string,genero: string, preco: number,avaliacao: number): boolean{
    for(let i=0;i<this._jogos.length;i++){
      if((this._jogos[i].id) == (jogo.id)){
        this._jogos[i].nome = nome;
        this._jogos[i].produtora = produtora;
        this._jogos[i].plataforma = plataforma;
        this._jogos[i].genero = genero;
        this._jogos[i].preco = preco;
        this._jogos[i].avaliacao = avaliacao;//falta a data ou ano
        return true;
      }
    }
    return false;
  }
  
}
