import { Component, computed, effect, inject } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-branding',
  standalone: true,
  template: `
    <a href="/">
      <img
        src="./assets/images/logos/logo.png"
        class="align-middle m-2 transition-all duration-300"
        alt="logo"
      />
    </a>
  `,
})
export class BrandingComponent {
  private settings = inject(CoreService);

  options = this.settings.getOptions();

  constructor() {}
}
