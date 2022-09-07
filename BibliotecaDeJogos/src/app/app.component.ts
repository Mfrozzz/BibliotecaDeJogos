import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/folder', icon: 'home' },
    { title: 'Adicionar', url: '/adicionar', icon: 'add-circle' },
    { title: 'Editar', url: '/folder/editar', icon: 'pencil' },
    { title: 'Visualizar', url: '/folder/visualizar', icon: 'eye' },
    { title: 'Remover', url: '/folder/remover', icon: 'trash' }
  ];
  constructor(private _route : Router) {}

  onClick(url:string){
    this._route.navigate([url]);
  }
}
