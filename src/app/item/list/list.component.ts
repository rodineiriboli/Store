import { Component, OnInit, OnChanges } from '@angular/core';
import { LocalStore } from 'src/app/shared/localStore.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges {

  constructor(private localStore: LocalStore) { }

  ngOnInit() {
    this.getAllLocalStore()
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
