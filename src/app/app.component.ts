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
  animations: [
    trigger('animation', [
      state('visible', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => *', [
        style({ transform: 'translateX(50%)', opacity: 0 }),
        animate('300ms ease-out')
      ]),
      transition('* => void', [
        animate(('250ms ease-in'), style({
          height: 0,
          opacity: 0,
          transform: 'translateX(50%)'
        }))
      ])
    ])
  ],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})

@Injectable()
export class AppComponent implements OnInit {

  private breadcrumbs: MenuItem[];
  private itemsMenu: MenuItem[];

  //unidade de medida
  name: string;
  code: string;
  unidadesDeMedida: SelectItem[];

  userform: FormGroup;

  submitted: boolean;

  description: string;
  columns: number[];

  //checkBox
  checkBoxValue: boolean;


  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private localStore: LocalStore) { }

  ngOnInit() {

    //inicialização de unidade de medida
    this.unidadesDeMedida = [
      { label: 'Selecione', value: '' },
      { label: 'Litro', value: { id: '1', name: 'Litro', code: 'lt' } },
      { label: 'Quilograma', value: { id: '2', name: 'Quilograma', code: 'kg' } },
      { label: 'Unidade', value: { id: '3', name: 'Unidade', code: 'un' } }
    ];

    //validação do formulário
    this.userform = this.fb.group({
      'nomeItem': new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z ]*'),
        ])),
      'unidadeMedida': new FormControl('', Validators.required),
      'quantidade': new FormControl(''),
      'preco': new FormControl('', Validators.required),
      'perecivel': new FormControl(''),
      'dataValidade': new FormControl('', Validators.required),
      'dataFabricacao': new FormControl('', Validators.required)
    });

    //navegação estrutural
    this.breadcrumbs = [
      { label: 'New', icon: 'pi pi-fw pi-plus' },
      { label: 'Open', icon: 'fa fa-list', url: 'https://en.wikipedia.org/wiki/Lionel_Messi' }
    ];

    //menu
    this.itemsMenu = [
      { label: 'Cadastro', icon: 'pi pi-fw pi-plus' },
      { label: 'Listagem', icon: 'fa fa-list' }
    ];
  }

  //Trata formulário para antes de salvar no localstore
  onSubmit(value: string) {
    this.userform.value.quantidade = this.userform.value.quantidade.toString();
    this.userform.value.preco = this.userform.value.preco.toString();
    this.userform.value.perecivel = this.userform.value.perecivel.toString();
    this.userform.value.dataFabricacao = this.userform.value.dataFabricacao.toLocaleDateString('pt-BR');
    this.userform.value.dataValidade = this.userform.value.dataValidade.toLocaleDateString('pt-BR');
    if (this.userform.value.perecivel === '')
      this.userform.value.perecivel = 'false';

    this.setLocalStore(this.userform.value)

    this.submitted = true;
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Item incluido com sucesso' });
    this.userform.reset();
  }

  // Salva dados na local store
  setLocalStore(data: string) {
    JSON.stringify(this.localStore.set(data));
  }

  // Busca dados na local store pela key
  getLocalStore(key: string) {
    return JSON.parse(this.localStore.get(key));
  }

  //Remove um item na local store
  removeLocalStore(key: string) {
    this.localStore.remove(key);
  }

  getAllLocalStore() {
    var listItens = []

    var key = this.localStore.returnKey()
    var cont = parseInt(key)
    
    for (let index = 1; index <= cont; index++) {
      var item = JSON.parse(this.localStore.get(index.toString()))
      listItens.push(item)
    }
    return listItens
  }
}
