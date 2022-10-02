import { Injectable } from '@angular/core';
import { finalize, takeLast } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Jogo } from '../model/jogo';

@Injectable({
  providedIn: 'root'
})
export class JogoFBServiceService {
  private PATH: string = 'jogos';

  constructor(private _angularFirestore: AngularFirestore, private _angularFireStorage: AngularFireStorage) { }

  inserirJogo(jogo: Jogo){
    return this._angularFirestore.collection(this.PATH).add({
      nome:jogo.nome,
      produtora:jogo.produtora,
      plataforma:jogo.plataforma,
      genero:jogo.genero,
      preco:jogo.preco,
      avaliacao:jogo.avaliacao,
      anoLancamento:jogo.anoLancamento,
      downloadURL:jogo.downloadURL
    });
  }

  editarJogo(jogo: Jogo,id:string){
    return this._angularFirestore.collection(this.PATH).doc(id).update({
      nome:jogo.nome,
      produtora:jogo.produtora,
      plataforma:jogo.plataforma,
      genero:jogo.genero,
      preco:jogo.preco,
      avaliacao:jogo.avaliacao,
      anoLancamento:jogo.anoLancamento
    });
  }

  apagarImagem(downloadURL:any){
    return this._angularFireStorage.storage.refFromURL(downloadURL).delete();
  }

  excluirJogo(jogo:Jogo){
    this.apagarImagem(jogo.downloadURL);
    return this._angularFirestore.collection(this.PATH).doc(jogo.id).delete();
  }

  getJogos(){
    return this._angularFirestore.collection(this.PATH).snapshotChanges();
  }

  getJogo(id:string){
    return this._angularFirestore.collection(this.PATH).doc(id).valueChanges();
  }

  inserirImg(imagem:any,jogo:Jogo){
    const file = imagem.item(0);
    if(file.type.split('/')[0]!='image'){
      console.error('Tipo não suportado');
      return;
    }
    const caminho = `images/${new Date().getTime()}_${file.name}`;
    const fileRef = this._angularFireStorage.ref(caminho);
    let task = this._angularFireStorage.upload(caminho,file);
    task.snapshotChanges().pipe(
      finalize(()=>{
        let uploadFile = fileRef.getDownloadURL();
        uploadFile.subscribe(resp =>{
          jogo.downloadURL = resp;
          this.inserirJogo(jogo);
        })
      })
    ).subscribe();
    return task;
  }

  editarImagem(imagem:any, jogo:Jogo,id:string){
    const file = imagem.item(0);
    if(file.type.split('/')[0]!='image'){
      console.error("Tipo não suportado");
      return;
    }
    const path = `images/${new Date().getTime()}_${file.name}`;
    const fileRef = this._angularFireStorage.ref(path);
    let task = this._angularFireStorage.upload(path,file);
    task.snapshotChanges().pipe(
      finalize(()=>{
        let uploadedFile = fileRef.getDownloadURL();
        uploadedFile.subscribe(resp => {
          jogo.downloadURL = resp;
          this.editarJogo(jogo,id);
          this.updateImagem(jogo,id);
        })
      })
    ).subscribe();
    return task;
  }

  updateImagem(jogo:Jogo,id:string){
    return this._angularFirestore.collection(this.PATH).doc(id).update({
      downloadURL: jogo.downloadURL
    });
  }

}
