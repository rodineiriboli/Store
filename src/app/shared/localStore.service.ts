import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class LocalStore {
  constructor() {}

    keyIncremment() {
        try {
            var key = localStorage.getItem('autoKey');

            if(key === null)
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
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.error('Erro ao retornar dado do localStore:', error);
      return null;
    }
  }

  remove(key: string) {
      try  {
          localStorage.removeItem(key);
      } catch (error) {
          console.error('Erro ao remover item do localStore:', error);
      }
  }
}