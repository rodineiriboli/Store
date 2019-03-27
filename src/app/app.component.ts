import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { MessageService, SelectItem } from 'primeng/api';

import { MenuItem } from 'primeng/api';

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
export class AppComponent implements OnInit {

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

  private breadcrumbs: MenuItem[];
  private itemsMenu: MenuItem[];

  constructor(private fb: FormBuilder, private messageService: MessageService) { }
  
  ngOnInit() {

    //inicialização de unidade de medida
    this.unidadesDeMedida = [
      {label:'Selecione', value:''},
      {label:'Litro', value:{id:1, name: 'Litro', code: 'lt'}},
      {label:'Quilograma', value:{id:2, name: 'Quilograma', code: 'kg'}},
      {label:'Unidade', value:{id:3, name: 'Unidade', code: 'un'}}
  ];

  //validação do formulário
    this.userform = this.fb.group({
      'nomeItem': new FormControl('', Validators.compose(
                                      [
                                        Validators.required, 
                                        Validators.maxLength(50),
                                        Validators.pattern(/[A-z]/),
                                      ])),
      'unidadeMedida': new FormControl('', Validators.required),
      'quantidade': new FormControl(''),
      'preco': new FormControl('', Validators.required),
      'perecivel': new FormControl('', Validators.required),
      'dataValidade': new FormControl('', Validators.required),
      'dataFabricacao': new FormControl('', Validators.required),
      // 'lastname': new FormControl('', Validators.required),
      // 'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      //  'description': new FormControl(''),
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
  onSubmit(value: string) {
    let quantidade = this.tratarUnidadeMedida();
    
    this.submitted = true;
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Item incluido com sucesso' });
  }

  tratarUnidadeMedida() {
    return JSON.stringify(this.userform.value.unidadeMedida);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
}
