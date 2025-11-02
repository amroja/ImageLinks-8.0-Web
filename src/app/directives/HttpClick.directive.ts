import {
  Directive,
  ElementRef,
  HostListener,
  output,
  inject,
} from '@angular/core';

/**
 * Disable the button then re-enable it.
 * Can be used on forms.
 * i.e.
 * component -> someFunction(httpClickHandler: HttpClickHandler)
 * view -> (appHttpClick)="someFunction($event)"
 *
 */
@Directive({
  selector: '[appHttpClick]',
  standalone: true,
})
export class HttpClickDirective {
  appHttpClick = output<HttpClickHandler>();

  private httpClickHandler: HttpClickHandler;
  private isForm: boolean;
  private el = inject(ElementRef);

  constructor() {
    this.httpClickHandler = new HttpClickHandler();
    this.isForm = this.el.nativeElement.tagName === 'FORM';
  }

  @HostListener('click', ['$event'])
  onClick(e: Event): void {
    if (this.isForm || this.httpClickHandler.isDisabled) {
      return;
    }
    this.httpClickHandler.disable();
    this.appHttpClick.emit(this.httpClickHandler);
  }

  @HostListener('submit', ['$event'])
  onSubmit(e: Event): void {
    if (!this.isForm || this.httpClickHandler.isDisabled) {
      return;
    }
    this.httpClickHandler.disable();
    this.appHttpClick.emit(this.httpClickHandler);
  }
}

export class HttpClickHandler {
  isDisabled: boolean = false;

  enable(): void {
    this.isDisabled = false;
  }

  disable(): void {
    this.isDisabled = true;
  }
}
