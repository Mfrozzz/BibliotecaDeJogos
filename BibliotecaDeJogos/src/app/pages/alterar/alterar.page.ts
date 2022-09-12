import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Jogo } from 'src/app/model/jogo';
import { JogoService } from 'src/app/services/jogo.service';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.page.html',
  styleUrls: ['./alterar.page.scss'],
})
export class AlterarPage implements OnInit {
  is_Submitted: boolean = false;
  ano_lancamento:string;
  jogo: Jogo;
  editarForm: FormGroup;

  constructor(private _formBuilder:FormBuilder,private alertController: AlertController,private _router: Router, private _jogoService : JogoService) {
  }

  ngOnInit() {
    this.ano_lancamento=new Date().toISOString();
    const nav = this._router.getCurrentNavigation();
    this.jogo = nav.extras.state.obj;
    this.editarForm = this._formBuilder.group({
      nome:[this.jogo.nome,[Validators.required]],
      produtora:[this.jogo.produtora,[Validators.required]],
      plataforma:[this.jogo.plataforma,[Validators.required]],
      genero:[this.jogo.genero,[Validators.required]],
      preco:[this.jogo.preco],
      avaliacao:[this.jogo.avaliacao,[Validators.required]],
      anoLancamento:[this.jogo.anoLancamento,[Validators.required]]
    })

  }

  submitForm(){
    this.is_Submitted = true;
    if(!this.editarForm.valid){
      this.presentAlert("Agenda","Erro","Todos os campos são Obrigatórios");
      return false;
    }else{
      this.edicao();
    }
  }

  get errorControl(){
    return this.editarForm.controls;
  }

  edicao(){
    if(this._jogoService.editar(this.jogo,this.editarForm.value['nome'],this.editarForm.value['produtora'],this.editarForm.value['plataforma'],this.editarForm.value['genero'],this.editarForm.value['preco'],this.editarForm.value['avaliacao'],this.editarForm.value['anoLancamento'])){
      this.presentAlert("Biblioteca de Jogos","Sucesso","Jogo Alterado");
      this._router.navigate(["/folder/folder"]);
    }else{
      this.presentAlert("Biblioteca de Jogos","Erro","Jogo não Alterado");
    }
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

  onClick(){
    this._router.navigate(["/editar"]);
  }

}