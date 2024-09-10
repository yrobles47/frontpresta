import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgIf,NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalCalculateComponent } from '../../modals/modal-calculate/modal-calculate.component';
import { PrevisualizarCronogramaComponent } from '../previsualizar-cronograma/previsualizar-cronograma.component';
import { BusquedaOperDocComponent } from 'src/app/component/commons/busqueda-oper-doc/busqueda-oper-doc.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cronograma-formulario',
  standalone: true,
  imports: [ 
    BusquedaOperDocComponent,
    ModalCalculateComponent,
    PrevisualizarCronogramaComponent,
    NgIf, 
    NgFor,
    FormsModule,
    CommonModule
  ],
  templateUrl: './cronograma-formulario.component.html',
  styleUrl: './cronograma-formulario.component.scss'
})
export class CronogramaFormularioComponent {
  tipo: string = 'pruebita';
  modalVisible: boolean = false;
  modalResult: any;
  //viewFormulario: boolean = false;
  viewReport: boolean = false;
  fechaDesembolso: Date = new Date();
  opcionPeriodoPagoMeses: number[] = Array.from({ length: 36 }, (_, i) => i + 1);
  constructor(private modalService: NgbModal) { }

  openModal() {
    //this.modalVisible = true; 
    this.viewReport = true; 
  }

  closeModal() {
    console.log('cerrando modal ');
    this.modalVisible = false;  
  }

  handleDataFromModal(data: any) {
    this.modalResult = data;
    this.viewReport = true; 
  }
 
  manejarResultado(event: { tipo: string, valor: string }) {
    //this.viewFormulario = true;
    console.log('Tipo de búsqueda:', event.tipo);
    console.log('Valor:', event.valor);
  }
}
