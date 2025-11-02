import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Injectable,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appHttpClick]',
})
export class HttpClickDirective {
  @Output('appHttpClick') callback: EventEmitter<any> = new EventEmitter<any>();

  httpClickHandler: HttpClickHandler;
  isForm: boolean;
  constructor(el: ElementRef) {
    this.httpClickHandler = new HttpClickHandler();
    this.isForm = el.nativeElement.tagName === 'FORM';
  }

  @HostListener('click', ['$event']) onClick() {
    if (this.isForm || this.httpClickHandler.isDisabled) {
      return;
    }
    this.httpClickHandler.disable();
    this.callback.emit(this.httpClickHandler);
  }
  @HostListener('submit', ['$event']) onSubmit() {
    if (!this.isForm || this.httpClickHandler.isDisabled) {
      return;
    }
    this.httpClickHandler.disable();
    this.callback.emit(this.httpClickHandler);
  }
}

@Injectable()
export class HttpClickHandler {
  isDisabled: boolean;
  constructor() {
    this.isDisabled = false;
  }
  enable() {
    this.isDisabled = false;
  }
  disable() {
    this.isDisabled = true;
  }
}
