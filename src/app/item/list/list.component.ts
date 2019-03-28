import { Component, OnInit, OnChanges } from '@angular/core';
import { LocalStore } from 'src/app/shared/localStore.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  itens: [] = <any>this.getAllLocalStore();

  constructor(private localStore: LocalStore, http: HttpClient) {

    //itens: [] = this.getAllLocalStore()
    // http
    // .get<Object[]>('http://localhost:4200/.../...')
    // .subscribe(
    //     itens => this.itens = itens,
    //     err => console.log(err)
    // );
   }

  ngOnInit() {
    //this.getAllLocalStore()
  }

  ngOnChanges() {

  }

  getAllLocalStore() {
    var listItens = []

    var key = this.localStore.returnKey()
    var cont = parseInt(key)

    for (let index = 1; index <= cont; index++) {
      var item = JSON.parse(this.localStore.get(index.toString()))
      listItens.push(item)
    }
    console.log(listItens)
    return listItens
  }
}
