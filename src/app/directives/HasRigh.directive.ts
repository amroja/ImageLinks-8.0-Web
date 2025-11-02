import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Right } from '../classes/Right.enum';
import { AuthorizationService } from '../services/authorization.service';

@Directive({
  selector: '[appHasRight]',
  standalone: true,
})
export class HasRightDirective implements OnInit, OnDestroy {
  private hasView: boolean = false;
  private componentRight: Right | undefined;
  private rightSubscription?: Subscription;
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private authorizationService = inject(AuthorizationService);

  @Input() set appHasRight(componentRight: string) {
    this.componentRight = Right[componentRight as keyof typeof Right];
  }

  ngOnInit(): void {
    this.rightSubscription = this.authorizationService.user.subscribe(
      (user) => {
        if (!user) {
          this.viewContainer.clear();
          this.hasView = false;
          return;
        }

        const hasRight = user.privileges.find((e) => e === this.componentRight);

        if (hasRight && !this.hasView) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (!hasRight && this.hasView) {
          this.viewContainer.clear();
          this.hasView = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.rightSubscription?.unsubscribe();
  }
}
