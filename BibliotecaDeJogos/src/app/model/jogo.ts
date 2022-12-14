export class Jogo {
    private _nome: string;
    private _produtora: string;
    private _plataforma: string;
    private _genero: string;
    private _preco: number;
    private _avaliacao: string;
    private _id: string;
    private _anoLancamento: string;
    private _downloadURL: any;
    
    constructor(nome:string,produtora: string,plataforma: string,genero: string,preco: number,avaliacao: string,anoLancamento: string){
        this._nome = nome;
        this._produtora = produtora;
        this._plataforma = plataforma;
        this._genero = genero;
        this._preco = preco;
        this._avaliacao = avaliacao;
        this._anoLancamento = anoLancamento;
    }
    
    public get nome(): string {
        return this._nome;
    }
    public set nome(value: string) {
        this._nome = value;
    }
    
    public get produtora(): string {
        return this._produtora;
    }
    public set produtora(value: string) {
        this._produtora = value;
    }
    
    public get plataforma(): string {
        return this._plataforma;
    }
    public set plataforma(value: string) {
        this._plataforma = value;
    }
    
    public get genero(): string {
        return this._genero;
    }
    public set genero(value: string) {
        this._genero = value;
    }
    
    public get preco(): number {
        return this._preco;
    }
    public set preco(value: number) {
        this._preco = value;
    }
    
    public get avaliacao(): string {
        return this._avaliacao;
    }
    public set avaliacao(value: string) {
        this._avaliacao = value;
    }

    public get id(): string{
        return this._id;
    }
    
    public get anoLancamento(): string {
        return this._anoLancamento;
    }
    public set anoLancamento(value: string) {
        this._anoLancamento = value;
    }

    public get downloadURL(): any {
        return this._downloadURL;
    }
    public set downloadURL(value: any) {
        this._downloadURL = value;
    }

}