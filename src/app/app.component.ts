import { Component, ViewEncapsulation, OnInit, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { MessageService, SelectItem } from 'primeng/api';

import { MenuItem } from 'primeng/api';
import { LocalStore } from './shared/localStore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],

  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  private breadcrumbs: MenuItem[];
  private itemsMenu: MenuItem[];

  constructor(private localStore: LocalStore) {

  }

  ngOnInit() {

    //navegação estrutural
    this.breadcrumbs = [
      { label: 'Cadastro', icon: 'pi pi-fw pi-plus' },
      { label: 'Listagem', icon: 'fa fa-list', url: 'https://en.wikipedia.org/wiki/Lionel_Messi' }
    ];

    //menu
    this.itemsMenu = [
      { label: 'Cadastro', icon: 'pi pi-fw pi-plus' },
      { label: 'Listagem', icon: 'fa fa-list' }
    ];
    
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
