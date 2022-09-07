import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Adicionar', url: '/folder/adicionar', icon: 'add-circle' },
    { title: 'Editar', url: '/folder/editar', icon: 'paper-plane' },
    { title: 'Visualizar', url: '/folder/folder', icon: 'eye' },
    { title: 'Remover', url: '/folder/remover', icon: 'trash' },

  ];
  constructor() {}
}
