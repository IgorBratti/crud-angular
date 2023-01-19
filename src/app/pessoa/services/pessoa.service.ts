import { Injectable } from '@angular/core';
import { Pessoa } from 'src/app/shared/models/pessoa.model';

const LS_CHAVE: string = "pessoas";

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor() { }

  listarTodos(): Pessoa[] {
    // Esse pessoas é uma string JSON contendo uma lista de pessoas
    //              localStorage acessa a chave que definimos para guardar as informações
    const pessoas = localStorage[LS_CHAVE];
    // Caso não houver nada em pessoas retorna Undefined que é o "[]" vazio
    // caso contrario é feito um parse das pessoas que estão no local storage
    return pessoas ? JSON.parse(pessoas) : [];
  }

  //    recebe um objeto do tipo pessoa
  inserir(pessoa: Pessoa): void {
    //por estar trabalhando com o LocalStorage precisa retornar todas as pessoas usando o listarTodos()
    const pessoas = this.listarTodos();
    // Como não se tem o ID usasse um ID unico que é um TimesTemp da data de agora
    pessoa.id = new Date().getTime();
    // dentro da lista de pessoas faz uma inclusão da pessoa que esta inserindo
    pessoas.push(pessoa);
    // Armazena essa lista de novo no localStorage
    // Como pessoas é uma lista de pessoas(objeto em javascript) usasse o stringify
    localStorage[LS_CHAVE] = JSON.stringify(pessoas);
  }

  //          passa um id numerico, podendo passar ou uma pessoa ou undefined(caso não tiver pessoas)
  buscarPorId(id: number): Pessoa | undefined {
   // lista todas as pessoas para retornar no array de pessoas[]
    const pessoas: Pessoa[] = this.listarTodos();
    // find para retonar o primeiro elemento da lista pessoas que satisfaz a condição
    //                  pessoa: nome do elemento para ser usado na condição
    //                            condição a ser satisfeita, usa o nome definido antes do Arrow Function
    return pessoas.find(pessoa => pessoa.id === id);
  }

  // recebe uma Pessoa como parametro
  atualizar(pessoa: Pessoa): void {
    //retorna a lista completa de pessoas
    const pessoas: Pessoa[] = this.listarTodos();
    // quando encontra a pessoa com o mesmo id, altera a lista
    pessoas.forEach( (obj, index, objs) => {
      // se a pessoa.id (parametro) for igual ao obj.id eu altero ela
      if (pessoa.id === obj.id) {
        objs[index] = pessoa
      }
    });

    // Armazena a nova lista no LocalStorage
    localStorage[LS_CHAVE] = JSON.stringify(pessoas);
  }

    // recebe um id de quem eu quero remover
    remover(id: number): void {
      // retorna a lista de todas as pessoas
      let pessoas: Pessoa[] = this.listarTodos();
      // filter(): retorna a mesma lista, com os registros que satisfazem a
      //           condição, isto é, cujo id é diferente do passado na função
      pessoas = pessoas.filter(pessoa => pessoa.id !== id);
      // atualizar o Local Storage
      localStorage[LS_CHAVE] = JSON.stringify(pessoas);
    }
  }

