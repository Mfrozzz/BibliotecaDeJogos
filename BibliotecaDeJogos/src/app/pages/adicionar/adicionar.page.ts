import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { JogoService } from 'src/app/services/jogo.service';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.page.html',
  styleUrls: ['./adicionar.page.scss'],
})
export class AdicionarPage implements OnInit {
  formCadastrar: FormGroup;
  is_Submitted: boolean = false;

  constructor(private _router : Router, private _formBuilder:FormBuilder,private alertController: AlertController,private _jogoService: JogoService) {
  }

  ngOnInit() {
    this.formCadastrar = this._formBuilder.group({
      nome:["",Validators.required],
      produtora:["",Validators.required],
      plataforma:["",Validators.required],
      genero:["",Validators.required],
      preco:["",Validators.required],
      avaliacao:["",Validators.required],
      anoLancamento:["",Validators.required]
    })
  }

  get errorControl(){
    return this.formCadastrar.controls;
  }

  submitForm(): boolean{
    this.is_Submitted = true;
    if(!this.formCadastrar.valid){
      this.presentAlert("Biblioteca","Erro","Todos os campos são Obrigatórios");
      return false;
    }else{
      this.cadastrar();
    }
  }

  private cadastrar() : void{
      this._jogoService.inserir(this.formCadastrar.value);
      this.formCadastrar = this._formBuilder.group({
        nome:[""],
        produtora:[""],
        plataforma:[""],
        genero:[""],
        preco:[""],
        avaliacao:[""],
        anoLancamento:[""]
      })
      this.presentAlert("Biblioteca de Jogos","Sucesso","Jogo adicionado em sua Biblioteca");
      this._router.navigate(["/visualizar"]);
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

}
