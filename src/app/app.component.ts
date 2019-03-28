import { Component, ViewEncapsulation, OnInit, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { MessageService, SelectItem } from 'primeng/api';

import { MenuItem } from 'primeng/api';
import { LocalStore } from './shared/localStore.service';
import { Router } from '@angular/router';

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

  constructor(private localStore: LocalStore, private router: Router) {

  }

  ngOnInit() {

    //navegação estrutural
    this.breadcrumbs = [
      { label: 'Cadastro', icon: 'pi pi-fw pi-plus', url: 'item/form' },
      { label: 'Listagem', icon: 'fa fa-list', url: 'item/list' }
    ];

    //menu
    this.itemsMenu = [
      { label: 'Cadastro', icon: 'pi pi-fw pi-plus' },
      { label: 'Listagem', icon: 'fa fa-list' }
    ];
    
  }

  getPageForm() {
    this.router.navigateByUrl('item/form');
  }

  getPageList() {
    this.router.navigateByUrl('item/list');
  }
}
