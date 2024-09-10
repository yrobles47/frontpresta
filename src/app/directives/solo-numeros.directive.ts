import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[appSoloNumeros]',
})
export class SoloNumerosDirective {

  constructor(
    private readonly elRef: ElementRef,
    private readonly ngModel: NgModel
  ) { }

  @HostListener('input', ['$event'])
  onChangeInput(event: Event):void {
    const input = this.elRef.nativeElement as HTMLInputElement;
    const oldValue = input.value;

    // Remove non-numeric characters
    const newValue = oldValue.replace(/[^0-9]/g, '');

    // Update the input field value
    if (oldValue !== newValue) {
      input.value = newValue;
      // Trigger a change event
      this.ngModel.control?.setValue(newValue, { emitEvent: false });
    }
  }

}
