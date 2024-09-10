import { Component, Input, OnInit } from '@angular/core';
import {  RouterLink , RouterOutlet,Router, ActivatedRoute, NavigationEnd } from '@angular/router'; 
import { NgClass,NgFor } from '@angular/common';
import { filter } from 'rxjs';
import { ROUTES } from './cronograma-items';
import { ModalAddCronogramaComponent } from './modals/modal-add-cronograma/modal-add-cronograma.component';
import { ModalCalculateComponent } from './modals/modal-calculate/modal-calculate.component';
import { PrevisualizarCronogramaComponent } from './components/previsualizar-cronograma/previsualizar-cronograma.component';
import { BusquedaOperDocComponent } from 'src/app/component/commons/busqueda-oper-doc/busqueda-oper-doc.component';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { SoloNumerosDirective } from 'src/app/directives/solo-numeros.directive';
import { CronogramaService } from './services/cronograma.service';
import { NotificationService } from 'src/app/services/global/notification.service';
import { trigger, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-cronograma',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgClass,
    NgFor,
    ModalCalculateComponent,
    PrevisualizarCronogramaComponent,
    BusquedaOperDocComponent,
    NgIf,
    ModalAddCronogramaComponent, 
    FormsModule,
    SoloNumerosDirective,
    CommonModule
  ],
  templateUrl: './cronograma.component.html',
  styleUrl: './cronograma.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CronogramaComponent implements OnInit { 
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();
  modalVisible: boolean = false;
  tipoBusqueda: string = 'documento';
  tipoDocumento: string = '1';
  numeroDocumento: string = ''; 
  dataCronograma = [];
  listaOperaciones = [];
  operacion: Object = {};
  verSeccionOperacion: boolean = false;
  private _numeroOperacionSeleccionado: string = '';
  constructor( 
    private cronogramaService: CronogramaService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {   

  } 

  //Getters y Setters

  get numeroOperacionSeleccionado(): string {
    return this._numeroOperacionSeleccionado;
  }

  set numeroOperacionSeleccionado(value: string) { 
    this._numeroOperacionSeleccionado = value;
    this.onNumeroOperacionSeleccionadoChange(value); 
  }

  limpiar() {
    this.numeroDocumento = '';
    this.verSeccionOperacion = false;
    this.listaOperaciones = [];
  }
  

  //Funciones


  onNumeroOperacionSeleccionadoChange(value: string) { 
    this.operacion = this.listaOperaciones.find(item => item.id == value);
  } 

  buscar() {
    // verificar que no este vacío
    if(this.numeroDocumento == '') {
      return;
    }

    const busqueda = {
      tipoBusqueda: this.tipoBusqueda,
    }

    if(this.tipoBusqueda == 'documento') {
      busqueda['numeroDocumento'] = this.numeroDocumento;
      busqueda['tipoDocumento'] = this.tipoDocumento;
    }

    if(this.tipoBusqueda == 'operacion') {
      const num = Number(this.numeroDocumento);
      busqueda['numeroOperacion'] = num;
    } 

    this.cronogramaService.getOperacionesByDocument(busqueda).subscribe(
      (response: any) => {
        this.verSeccionOperacion = false;
        if(response.length > 0) {
          this.listaOperaciones = response;
          this.numeroOperacionSeleccionado = response[0].id;
          this.verSeccionOperacion = true;
        }else{
          this.verSeccionOperacion = false;
          this.listaOperaciones = [];
          this.notificationService.showNotification('error', 'No se encontraron resultados');
        }
        
      },
      (error) => {
        console.log(error);
      }
    )
  } 
  agregarSimulacion() {
    this.modalVisible = true;
  }



  //Funciones para el modal
  closeModal() {
    this.modalVisible = false;  
  } 

  handleDataFromModal(data: any) {
    if(data.generar){
      this.dataCronograma.push({
      
      });
    }  
  }
 
}
