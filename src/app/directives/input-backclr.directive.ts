import { Directive, ElementRef, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[inputBackclr]'
})
export class InputBackclrDirective {
  constructor(private el: ElementRef) { }
  @Input('inputBackclr') inputStr:string='';
  @HostBinding('style.backgroundColor') bgColor:string='';
  @HostBinding('style.color') color:string='';
  @HostListener('keyup')
  changeBg(){
    this.bgColor= this.inputStr==='' ? "#9f5e5e" : "black";
  }
}
