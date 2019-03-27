import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class LocalStore {
  constructor() { }

  // incrementa a chave do localstore para simular auto incremento
  keyIncremment() {
    try {
      var key = localStorage.getItem('autoKey');

      if (key === null)
        key = '0';

      var newKey = parseInt(key);
      newKey++;
      key = newKey.toString();

      localStorage.setItem('autoKey', key);

    } catch (error) {
      console.error('Erro ao recuperar chave auto incrementavel.', error);
    }
    return key;
  }

  // Decrementa a chave do localstore
  keyDecrement() {
    try {
      var key = localStorage.getItem('autoKey')

      if (key === null)
        key = '0';

      var newKey = parseInt(key);
      newKey--;
      key = newKey.toString();

      localStorage.setItem('autoKey', key);

    } catch (error) {
      console.error('Erro ao acessar chave auto incrementavel.', error);
    }
    return key;
  }
  returnKey() {
    try {
      var key = localStorage.getItem('autoKey');

      if (key === null)
        key = '0';

    } catch (error) {
      console.error('Erro ao recuperar chave auto incrementavel.', error);
    }
    return key;
  }

  set(data: string): void {
    var key = this.keyIncremment();
    try {
      localStorage.setItem(key, data);
    } catch (error) {
      console.error('Erro ao salvar dado no localStore: ', error);
    }
  }

  get(key: string) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Erro ao retornar dado do localStore:', error);
      return null;
    }
  }

  remove(key: string) {
    try {
      localStorage.removeItem(key);
      this.keyDecrement();
    } catch (error) {
      console.error('Erro ao remover item do localStore:', error);
    }
  }
}