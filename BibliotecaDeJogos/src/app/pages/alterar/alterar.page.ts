import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Jogo } from 'src/app/model/jogo';
import { JogoFBServiceService } from 'src/app/services/jogo-fbservice.service';
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
  imagem : any;
  event : any;

  constructor(private _loadingCtrl: LoadingController,private _formBuilder:FormBuilder,private alertController: AlertController,private _router: Router, private _jogoService : JogoFBServiceService) {
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
    });

  }

  uploadFile(imagem:any){
    this.imagem = imagem.files;
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
      this.showLoading("Editando.",1000);
      if(this.imagem){
        this._jogoService.editarImagem(this.imagem,this.editarForm.value,this.jogo.id).then(()=>{
          this._loadingCtrl.dismiss();
          this.presentAlert("GameBox","Sucesso","Jogo Alterado");
          this.editarForm.reset();
          this._router.navigate(["/folder/folder"]);
        }).catch((error)=>{
          this._loadingCtrl.dismiss();
          this.presentAlert("GameBox","Erro","Jogo não Alterado");
          console.log(error);
        });
      }else{
        this._jogoService.editarJogo(this.editarForm.value,this.jogo.id).then(()=>{
          this._loadingCtrl.dismiss();
          this.presentAlert("GameBox","Sucesso","Jogo Alterado");
          this.editarForm.reset();
          this._router.navigate(["/folder/folder"]);
        }).catch((error)=>{
          this._loadingCtrl.dismiss();
          this.presentAlert("GameBox","Erro","Jogo não Alterado");
          console.log(error);
        });
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

  async showLoading(mensagem:string,duracao:number) {
    const loading = await this._loadingCtrl.create({
      message: mensagem,
      duration: duracao,
    });

    loading.present();
  }

  onClick(){
    this._router.navigate(["/editar"]);
  }

}