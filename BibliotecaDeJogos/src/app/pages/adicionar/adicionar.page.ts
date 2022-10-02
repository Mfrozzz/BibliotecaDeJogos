import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { JogoService } from 'src/app/services/jogo.service';
import { JogoFBServiceService } from 'src/app/services/jogo-fbservice.service';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.page.html',
  styleUrls: ['./adicionar.page.scss'],
})
export class AdicionarPage implements OnInit {
  formCadastrar: FormGroup;
  is_Submitted: boolean = false;
  ano_lancamento:string;
  event:any;
  imagem:any;

  constructor(private _router : Router,private _loadingCtrl: LoadingController, private _formBuilder:FormBuilder,private alertController: AlertController,private _jogoService: JogoFBServiceService) {
  }

  ngOnInit() {
    this.ano_lancamento=new Date().toISOString();
    this.formCadastrar = this._formBuilder.group({
      nome:["",[Validators.required]],
      produtora:["",[Validators.required]],
      plataforma:["",[Validators.required]],
      genero:["",[Validators.required]],
      preco:[""],
      avaliacao:["",[Validators.required]],
      anoLancamento:["",[Validators.required]],
      imagem: ["",[Validators.required]]
    })
  }

  get errorControl(){
    return this.formCadastrar.controls;
  }

  uploadFile(imagem:any){
    this.imagem = imagem.files;
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

  async showLoading(mensagem:string,duracao:number) {
    const loading = await this._loadingCtrl.create({
      message: mensagem,
      duration: duracao,
    });

    loading.present();
  }

  private cadastrar() : void{
    this.showLoading("Aguarde...",1000);
      this._jogoService.inserirImg(this.imagem,this.formCadastrar.value).then(()=>{
        this._loadingCtrl.dismiss();
        this.presentAlert("GameBox","Sucesso","Jogo adicionado na Biblioteca.");
        this.formCadastrar.reset();
        this._router.navigate(["/visualizar"]);
      }).catch((error)=>{
        this._loadingCtrl.dismiss();
        this.presentAlert("GameBox","Falha","Jogo não foi adicionado na Biblioteca.");
        console.log(error);
      });
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
